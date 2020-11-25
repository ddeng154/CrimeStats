import unittest
import api
from gitlab import Stats as GitLabStats

# testing suite for the backend features of the website
class Test(unittest.TestCase):
    # tests whether the dev information from gitlab is being
    # obtained correctly, and exists
    def testGitlab(self):
        stats = GitLabStats()
        response = stats.get()
        expectedKeys = {"name", "commits", "issues", "tests"}
        self.assertIsInstance(response, list)
        for s in response:
            self.assertIsInstance(s, dict)
            actualKeys = set(s.keys())
            self.assertEqual(actualKeys, expectedKeys)
            self.assertIsInstance(s["name"], str)
            self.assertIsInstance(s["commits"], int)
            self.assertIsInstance(s["issues"], int)
            self.assertIsInstance(s["tests"], int)

    # tests that for each county, the data points like
    # name and id exist
    def testCounties(self):
        counties = api.County.query.all()
        for county in counties:
            self.assertIsInstance(county.id, str)
            self.assertIsInstance(county.name, str)
            self.assertIsInstance(county.state, str)
            self.assertIsInstance(county.median_income, int)
            self.assertIsInstance(county.total_pop, int)
            self.assertIsInstance(county.black_pop, int)
            self.assertIsInstance(county.white_pop, int)
            self.assertIsInstance(county.pacific_pop, int)
            self.assertIsInstance(county.native_pop, int)
            self.assertIsInstance(county.asian_pop, int)
            self.assertIsInstance(county.area, float)
            self.assertIsInstance(county.longitude, float)
            self.assertIsInstance(county.latitude, float)

    # tests that for each police department, data points like
    # amount of police, and division name exist
    def testPolices(self):
        polices = api.Police.query.all()
        for police in polices:
            self.assertIsInstance(police.ori, str)
            self.assertIsInstance(police.name, str)
            self.assertIsInstance(police.pop, int)
            self.assertIsInstance(police.num_male_officers, int)
            self.assertIsInstance(police.num_female_officers, int)
            self.assertIsInstance(police.num_civilians, int)
            self.assertIsInstance(police.dept_type, str)
            self.assertIsInstance(police.div_name, str)
            self.assertIsInstance(police.reg_name, str)
            self.assertIsInstance(police.density_per_1000, float)

    # tests that for each crime, data points like type and demographics
    # of the offender exist
    def testCrimes(self):
        crimes = api.Crime.query.all()
        for crime in crimes:
            self.assertIsInstance(crime.id, int)
            self.assertIsInstance(crime.ori, str)
            self.assertIsInstance(crime.type, str)
            self.assertIsInstance(crime.o_white, int)
            self.assertIsInstance(crime.o_black, int)
            self.assertIsInstance(crime.o_pacific, int)
            self.assertIsInstance(crime.o_native, int)
            self.assertIsInstance(crime.o_asian, int)
            self.assertIsInstance(crime.v_white, int)
            self.assertIsInstance(crime.v_black, int)
            self.assertIsInstance(crime.v_pacific, int)
            self.assertIsInstance(crime.v_native, int)
            self.assertIsInstance(crime.v_asian, int)

    # tests that the links in the pages to other pages
    # exist and function properly
    def testLinks(self):
        links = api.PoliceCountyLink.query.all()
        for link in links:
            self.assertIsInstance(link.id, int)
            self.assertIsInstance(link.county_id, str)
            self.assertIsInstance(link.ori, str)


if __name__ == "__main__":
    unittest.main()
