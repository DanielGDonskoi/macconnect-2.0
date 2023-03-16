from django.test import TestCase
from django.contrib.auth.models import User
from django.urls import reverse

class SignUpTest(TestCase):
    def test_registration(self):
        User.objects.create_user('testuser', 'test@example.com', 'password')

        self.assertEqual(User.objects.count(), 1)

        user = User.objects.get(username='testuser')
        self.assertEqual(user.email, 'test@example.com')


class DoubleSignUpTest(TestCase):
    def test_registration(self):
        User.objects.create_user('testuser', 'test@example.com', 'password')
        User.objects.create_user('testuser1', 'test1@example.com', 'password')
        
        self.assertEqual(User.objects.count(), 2) # Check if 2 users were created

        user = User.objects.get(username='testuser')
        self.assertEqual(user.email, 'test@example.com')

        user = User.objects.get(username='testuser1')
        self.assertEqual(user.email, 'test1@example.com')

class AdminTest(TestCase):
    def test_adminPage(self):
        url = reverse('admin:index')

        response = self.client.get(url, follow=True)

        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'administration')

class ProfileList(TestCase):
    def test_profileList(self):
        url = reverse('admin:index')

        response = self.client.get(url, follow=True)

        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'administration')

class ProfileListTest(TestCase):
    def test_profiles(self):
        url = reverse('profiles')

        response = self.client.get(url, follow=True)

        self.assertEqual(response.status_code, 200)

class NewProfileListTest(TestCase):
    def test_newProfiles(self):

        url = reverse('new_profiles')

        response = self.client.get(url, follow=True)

        self.assertEqual(response.status_code, 200)

class PostPageTest(TestCase):
    def test_postPage(self):

        url = reverse('posts_list')

        response = self.client.get(url, follow=True)

        self.assertEqual(response.status_code, 200)

class UserListTest(TestCase):
    def test_userList(self):

        url = reverse('user_list')

        response = self.client.get(url, follow=True)

        self.assertEqual(response.status_code, 200)