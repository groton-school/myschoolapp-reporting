const puppeteer = require('puppeteer');
const path = require('path');

(require('dotenv')).config();

const config = {
    SUBDOMAIN: undefined,
    DATA_DIR: path.join(__dirname, 'data'),
    USERNAME: undefined,
    PASSWORD: undefined,
    ...process.env
}

const safeFilename = (raw) => {
    return raw.replace(/[\/:\\]+/g, '-');
} 

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const [listPage] = await browser.pages();

    const timestamp = new Date().toISOString().substr(0, 10);

    await listPage.goto(`https://${config.SUBDOMAIN}.myschoolapp.com/app/academics#usergrouplist`);

    // potential interactive login if no credentials in environment
    if (config.USERNAME && config.PASSWORD) {
        // Blackbaud username entry
        await (await listPage.waitForSelector('input#Username')).type(config.USERNAME);
        await listPage.click('input#nextBtn');

        // Microsoft 365 SSO password entry
        await (await listPage.waitForSelector('input[name="passwd"]')).type(config.PASSWORD);
        await listPage.click('input[type="submit"]');
    }

    // filter list of active courses
    await (await listPage.waitForSelector('.grid-filters-icon')).click();
    await (await listPage.waitForSelector('.grouptype-filter-dropdown')).select('1');
    await (await listPage.waitForSelector('.apply-filters-button')).click();

    // pagination
    let done = false;
    do {
        // iterate visible course sections
        const sections = await listPage.$$eval('a[href^="#academicclass"]', sections => sections.map(section => {
            return {
                teacher: section.closest('tr').querySelector('td:nth-child(2)').textContent.replace(/ \(Teacher\)/g, '').split('\n').filter(elt => elt.length > 0).join(', '),
                title: section.textContent,
                url: section.href
            }
        }));
        for (const section of sections) {
            const screenshotPath = path.join(config.DATA_DIR, safeFilename(`${timestamp} - ${section.teacher} - ${section.title}`));

            // bulletin board
            const sectionPage = await browser.newPage();
            await sectionPage.setViewport({ width: 1920, height: 1080 });

            console.log(`${section.teacher} - ${section.title}...`);
            await sectionPage.goto(section.url, { waitUntil: 'networkidle0' });
            await sectionPage.$eval('.main-bulletin-container', container => container.style.display = "none");
            await sectionPage.screenshot({ fullPage: true, path: `${screenshotPath} - bulletin-board.png` });
            console.log('  bulletin board');

            // topics
            await sectionPage.goto(sectionPage.url().replace('bulletinboard', 'topics'), { waitUntil: 'networkidle0' })
            for (const selector of ['#chkActiveTopics', '#chkFutureTopics', '#chkExpiredTopics']) {
                await sectionPage.waitForSelector(selector);
                await sectionPage.$eval(selector, checkbox => {
                    if (checkbox.checked) {
                        checkbox.click();
                    }
                })
            }
            await sectionPage.$$eval('#more', expanders => expanders && expanders.forEach(async (more) => await more.click()));
            await sectionPage.$eval('.main-bulletin-container', container => container.style.display = "none");
            await sectionPage.screenshot({ fullPage: true, path: `${screenshotPath} - topics.png` });
            console.log('  topics');

            // assignments
            await sectionPage.click('#assignments-link');
            await (await sectionPage.waitForSelector('button[aria-label="Filter"]')).click();
            await (await sectionPage.waitForSelector('select[formcontrolname="filterOption"]')).select('4: 3');
            await (await sectionPage.waitForSelector('select[formcontrolname="selectValue"]')).select('-10');
            await (await sectionPage.waitForSelector('.sky-modal-footer-container button.sky-btn-primary')).click();
            await sectionPage.screenshot({ fullPage: true, path: `${screenshotPath} - assignments.png` });
            console.log('  assignments');

            await sectionPage.close();
        }

        await listPage.$eval('.pagination li:last-child', async (li) => {
            if (li.classList.contains('disabled')) {
                done = true;
            } else {
                await li.firstElementChild.click();
            }
        })
        await listPage.waitForTimeout(1000);
    } while (!done);
})();