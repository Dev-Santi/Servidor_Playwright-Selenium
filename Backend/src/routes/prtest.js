import { Router } from "express";
import { chromium, devices } from "playwright";

const router = Router();

router.get("/", async (req, res) => {
    try {
        // Setup
        const browser = await chromium.launch();
        const context = await browser.newContext(devices["Desktop Chrome"]);
        const page = await context.newPage();

        // Tests
        await page.goto(req.query.url);
        const titulo = await page.title();
        const tituloEsCorrecto = titulo.toLowerCase() === req.query.title.trim().toLowerCase();

        // Teardown
        await context.close();
        await browser.close();

        // Response
        res.json({ resultado: tituloEsCorrecto, valorObtenido: titulo });
    } catch (e) {
        // Error
        res.json({ resultado: "error", error: e });
    }
});

router.get("/cotizaciones", async (req, res) => {
    try {
        // Setup
        const browser = await chromium.launch();
        const context = await browser.newContext(devices["Desktop Chrome"]);
        const page = await context.newPage();

        // Tests
        await page.goto("https://www.indumex.com/");
        const compraDolar = await page.locator("span#compraDolar").textContent();
        const ventaDolar = await page.locator("span#ventaDolar").textContent();

        const compraReal = await page.locator("span#compraReal").textContent();
        const ventaReal = await page.locator("span#ventaReal").textContent();

        const compraArg = await page.locator("span#compraArg").textContent();
        const ventaArg = await page.locator("span#ventaArg").textContent();

        const cotizaciones = {
            dolar: [compraDolar, ventaDolar],
            real: [compraReal, ventaReal],
            arg: [compraArg, ventaArg],
        };

        // Teardown
        await context.close();
        await browser.close();

        // Response
        res.json({ resultado: cotizaciones });
    } catch (e) {
        // Error
        res.json({ resultado: "error", error: e });
    }
});

export default router;
