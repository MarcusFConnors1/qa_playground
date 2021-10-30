import { By, until, WebDriver } from "selenium-webdriver";

//ok, here we go. I am going to write what I think the code is and compare it to the solution
export class SpecPage {
    // the different variables I will be using
    driver: WebDriver;
    searchBar: By = By.name('q');
    results: By = By.id("rso");
    google: string = "https://www.google.com";
    // and the constructor
    constructor(driver: WebDriver) {
        this.driver = driver;
    }
    // this is the code to navigate from the codeChallenge
    async navigate(url?: string): Promise<void> {
        if (url) return this.driver.get(url);
        else return this.driver.get(this.google);
    }
    // here is where I got a tad confused. I forgot this step because I thought that sendKeys what a function of
    // webdriver. I forgot this function and getText because of that :/
    async sendKeys(elementBy: By, keys): Promise<void> {
        await this.driver.wait(until.elementLocated(elementBy));
        return this.driver.findElement(elementBy).sendKeys(keys);
    }

    async getText(elementBy: By): Promise<string> {
        await this.driver.wait(until.elementLocated(elementBy));
        return (await this.driver.findElement(elementBy)).getText();
    }
    // I wrote this function a lot sloppier than what the solution had, I just had it send the keys "purple" bc I
    // couldn't remember the syntax to reference text (`${   }\n`)
    async doSearch(text): Promise<void> {
        await this.driver.wait(until.elementLocated(this.searchBar));
        await this.sendKeys(this.searchBar, `${text}\n`);
    }
    // before I looked at the solution I just had an expect(results).toBe("purple"), it also took me a 
    // while to realize that I needed a return here instead of an await
    async getResults() {
        return this.getText(this.results);
    }
}
