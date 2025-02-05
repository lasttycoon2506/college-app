# Generated by Django 5.1.5 on 2025-02-05 19:18

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='College',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, null=True)),
                ('address', models.CharField(max_length=100, null=True)),
                ('tuition', models.IntegerField(max_length=20, null=True)),
                ('type', models.CharField(choices=[('Public', 'Public'), ('Private', 'Private')], default='Public')),
                ('established', models.IntegerField(max_length=4, null=True)),
                ('endowment', models.IntegerField(max_length=20, null=True)),
                ('academicStaff', models.IntegerField(max_length=10, null=True)),
                ('undergrad', models.IntegerField(max_length=10, null=True)),
                ('postgrad', models.IntegerField(max_length=10, null=True)),
                ('campusSize', models.IntegerField(max_length=10, null=True)),
                ('division', models.CharField(choices=[('D1', 'D1'), ('D2', 'D2'), ('D3', 'D3')], default='D1')),
            ],
        ),
    ]
