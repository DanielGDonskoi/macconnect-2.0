# Generated by Django 4.1.5 on 2023-02-13 01:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_newprofile_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='newprofile',
            name='id',
        ),
    ]
