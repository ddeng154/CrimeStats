import unittest
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from webdriver_manager.utils import ChromeType
import os
<<<<<<< HEAD
from selenium.webdriver.firefox.options import Options as FirefoxOptions
from selenium.webdriver.firefox.firefox_binary import FirefoxBinary
=======
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

>>>>>>> 41f55cbcb7079a58d475225e9272f6a6c424c358
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
        driver.get("http://crimestats.me/counties")
        #driver.implicitly_wait(10)

        element = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.NAME, "Counties"))
        )

        self.assertEqual(
            "Counties",
            driver.find_element_by_xpath(
                "/html/body/div/div/div/div/div[2]/h1").text,
        )
    # test that attempts to navigate to the police departments page
    def test2(self):
        driver.get("http://crimestats.me/policedepartments")

        #driver.implicitly_wait(10)

        element = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.NAME, "Police Departments"))
        )

        self.assertEqual(
            "Police Departments",
            driver.find_element_by_xpath(
                "/html/body/div/div/div/div/div[2]/h1").text,
        )


if __name__ == "__main__":
    unittest.main()
