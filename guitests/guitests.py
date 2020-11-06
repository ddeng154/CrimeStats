import unittest
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from webdriver_manager.utils import ChromeType
import os
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--headless")
chrome_options.add_argument("--disable-dev-shm-usage")
driver = webdriver.Chrome(
    executable_path="./chromedriver_linux.exe", chrome_options=chrome_options
)

#selenium testing suite for testing the website gui
class SeleniumTests(unittest.TestCase):
    #test that attempts to navigate to the counties page
    def test1(self):
        driver.get("https://crimestats.me/counties")
        driver.implicitly_wait(10)

        self.assertEqual(
            "Counties",
            driver.find_element_by_xpath(
                "/html/body/div/div/div/div/div[2]/h1").text,
        )
    # test that attempts to navigate to the police departments page
    def test2(self):
        driver.get("https://crimestats.me/policedepartments")

        driver.implicitly_wait(10)

        self.assertEqual(
            "Police Departments",
            driver.find_element_by_xpath(
                "/html/body/div/div/div/div/div[2]/h1").text,
        )


if __name__ == "__main__":
    unittest.main()
