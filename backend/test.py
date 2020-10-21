import unittest
import api
from gitlab import Stats as GitLabStats


class Test(unittest.TestCase):
    def testgitlab(self):
        stats = GitLabStats()
        response = stats.get()
        expectedKeys = {"name", "commits", "issues", "tests"}
        self.assertTrue(isinstance(response, list))
        for s in response:
            self.assertTrue(isinstance(s, dict))
            actualKeys = set(s.keys())
            self.assertEqual(actualKeys, expectedKeys)
            self.assertTrue(isinstance(s["name"], str))
            self.assertTrue(isinstance(s["commits"], int))
            self.assertTrue(isinstance(s["issues"], int))
            self.assertTrue(isinstance(s["tests"], int))

    def testapi(self):
        actual = set(api.db.engine.table_names())
        expected = {"police", "crime", "county", "police_county_link"}
        self.assertEqual(actual, expected)


if __name__ == "__main__":
    unittest.main()
