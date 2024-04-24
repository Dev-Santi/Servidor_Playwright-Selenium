import { Router } from "express";
import { Browser, Builder } from "selenium-webdriver";
import { Options } from "selenium-webdriver/chrome.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
        // Setup
        const driver = await new Builder()
            .forBrowser(Browser.CHROME)
            .setChromeOptions(new Options().addArguments("--headless=new")) //
            .build();

        // Test
        await driver.get(req.query.url);
        const titulo = await driver.getTitle();
        const tituloEsCorrecto = titulo.toLowerCase() === req.query.title.trim().toLowerCase();

        // Teardown
        await driver.quit();

        // Response
        res.json({ resultado: tituloEsCorrecto, valorObtenido: titulo });
    } catch (e) {
        // Error
        res.json({ resultado: "error", error: e });
        console.log(e);
    }
});

export default router;
