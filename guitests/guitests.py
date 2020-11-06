import unittest
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from webdriver_manager.utils import ChromeType
import os
from selenium.webdriver.firefox.options import Options as FirefoxOptions
from selenium.webdriver.firefox.firefox_binary import FirefoxBinary
chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--headless")
chrome_options.add_argument("--disable-dev-shm-usage")
driver = webdriver.Chrome(
    executable_path="./chromedriver_linux.exe", chrome_options=chrome_options
)
driver.set_window_size(1080, 800)

#selenium testing suite for testing the website gui
class SeleniumTests(unittest.TestCase):
    #test that attempts to navigate to the counties page
    def test1(self):
        driver.get("http://crimestats.me")
        driver.implicitly_wait(5)
        counties_element = driver.find_element_by_xpath(
            "/html/body/div/div/div/div/div[1]/nav/div[1]/a[1]"
        )
        counties_element.click()

        driver.implicitly_wait(10)
        self.assertEqual(
            "Counties",
            driver.find_element_by_xpath(
                "/html/body/div/div/div/div/div[2]/h1").text,
        )
    # test that attempts to navigate to the police departments page
    def test2(self):
        driver.get("http://crimestats.me")
        driver.implicitly_wait(5)
        pd_element = driver.find_element_by_xpath(
            "/html/body/div/div/div/div/div[1]/nav/div[1]/a[2]"
        )
        pd_element.click()

        driver.implicitly_wait(10)
        self.assertEqual(
            "Police Departments",
            driver.find_element_by_xpath(
                "/html/body/div/div/div/div/div[2]/h1").text,
        )


if __name__ == "__main__":
    unittest.main()
