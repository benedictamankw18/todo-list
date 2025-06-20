# Generated by Django 5.2.1 on 2025-06-04 20:00

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('task', models.CharField(max_length=255)),
                ('entry', models.DateField()),
                ('start', models.DateField()),
                ('end', models.DateField()),
                ('desc', models.TextField()),
                ('owner', models.CharField(max_length=100)),
                ('type', models.CharField(choices=[('PRIVATE', 'Private'), ('PUBLIC', 'Public'), ('PERSONAL', 'Personal')], max_length=20)),
                ('status', models.CharField(choices=[('INCOMPLETE', 'Incomplete'), ('COMPLETE', 'Complete')], max_length=20)),
            ],
        ),
    ]
