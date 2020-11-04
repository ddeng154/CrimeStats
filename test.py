import unittest
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager

class SeleniumTests(unittest.TestCase):
    def setUp(self):
        # create Chrome session
        self.driver = webdriver.Chrome(ChromeDriverManager().install())
        self.driver.implicitly_wait(10)

        # navigate to webpage
        self.driver.get("http://localhost:3000")
    
    
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

            
