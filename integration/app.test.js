describe('task', () => {
    it('base example, visually looks correct', async () => {
        // APIs from jest-puppeteer
        await page.goto('http://192.168.43.189:9009/iframe.html?id=todolists-task--task-is-done');

        const image = await page.screenshot();

        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot();
    });
})

// http://192.168.43.189:9009/iframe.html?id=todolists-additemform--add-item-form-example&viewMode=story