# Generated by Django 2.2.1 on 2019-06-03 02:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='PriorityMaster',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('priority', models.CharField(max_length=50)),
                ('active_flag', models.SmallIntegerField(default=1)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='TaskStateMaster',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('state', models.CharField(max_length=50)),
                ('active_flag', models.SmallIntegerField(default=1)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Users',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('email_id', models.EmailField(max_length=254)),
                ('password', models.TextField()),
                ('is_store_man', models.SmallIntegerField(default=0)),
                ('active_flag', models.SmallIntegerField(default=1)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Tasks',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='+', to='tasks.Users')),
                ('employee', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='+', to='tasks.Users')),
                ('priority', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tasks.PriorityMaster')),
                ('task_state', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tasks.TaskStateMaster')),
            ],
        ),
    ]
