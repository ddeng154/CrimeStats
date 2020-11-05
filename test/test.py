import unittest
from selenium import webdriver
#from webdriver_manager.chrome import ChromeDriverManager
#from webdriver_manager.utils import ChromeType
import os
from selenium.webdriver.firefox.options import Options as FirefoxOptions
from selenium.webdriver.firefox.firefox_binary import FirefoxBinary


class SeleniumTests(unittest.TestCase):
    def setUp(self):
        # create Firefox session
        firefox_binary = FirefoxBinary("./geckodriver")
        options = FirefoxOptions()
        options.add_argument("--headless")
        self.driver = webdriver.Firefox(firefox_binary=firefox_binary, options=options)
        
        # create Chrome session
        #        chrome_path = "./chromedriver_linux"
        #        chrome_options = webdriver.ChromeOptions()
        #        chrome_options.add_argument('--headless')
        #        chrome_options.add_argument('--disable-gpu')
        #        chrome_options.add_argument("window-size=1024,768")
        #        chrome_options.add_argument("--no-sandbox")
        #        self.driver = webdriver.Chrome(chrome_path, chrome_options=chrome_options)
        #>>>>>>> 7789d9b0f629b3d00ff983058d30e0034d0f03e9
        #        self.driver.implicitly_wait(10)
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


