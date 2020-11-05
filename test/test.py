import unittest
from selenium import webdriver
#from webdriver_manager.chrome import ChromeDriverManager
#from webdriver_manager.utils import ChromeType
import os


class SeleniumTests(unittest.TestCase):
    def setUp(self):
        # create Chrome session
        chrome_path = "./chromedriver_linux"
        chrome_options = webdriver.ChromeOptions()
        chrome_options.add_argument('--headless')
        chrome_options.add_argument('--disable-gpu')
        chrome_options.add_argument("window-size=1024,768")
        chrome_options.add_argument("--no-sandbox")
        self.driver = webdriver.Chrome(chrome_path, chrome_options=chrome_options)
        self.driver.implicitly_wait(10)
        # navigate to webpage
        self.driver.get("http://www.crimestats.me")
    
    
    def test1(self):
        counties_element = self.driver.find_element_by_xpath("/html/body/div/div/div/div/div[1]/nav/div[1]/a[1]")
        counties_element.click()

        self.driver.implicitly_wait(10)
        self.assertEqual("Counties", self.driver.find_element_by_xpath("/html/body/div/div/div/div/div[2]/h1").text)

    def test2(self):
        pd_element = self.driver.find_element_by_xpath("/html/body/div/div/div/div/div[1]/nav/div[1]/a[2]")
        pd_element.click()

        self.driver.implicitly_wait(10)
        self.assertEqual("Police Departments", self.driver.find_element_by_xpath("/html/body/div/div/div/div/div[2]/h1").text)
        
if __name__ == '__main__':
    unittest.main()

            
