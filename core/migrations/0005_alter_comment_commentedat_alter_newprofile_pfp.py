# Generated by Django 4.1.5 on 2023-01-30 00:26

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_alter_comment_commentedat_alter_newprofile_pfp'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='commentedat',
            field=models.DateTimeField(default=datetime.datetime(2023, 1, 29, 19, 26, 16, 529037)),
        ),
        migrations.AlterField(
            model_name='newprofile',
            name='pfp',
            field=models.ImageField(default=None, upload_to=None),
        ),
    ]