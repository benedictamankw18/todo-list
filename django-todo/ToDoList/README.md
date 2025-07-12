# 🇬🇭 Ghana Todo System - Complete Task Management Solution

A comprehensive task management system optimized for Ghana users with multi-channel notifications, secure authentication, and mobile-responsive design.

## ✨ Features

### 🔐 Secure Authentication
- User registration and login
- Session management with security enhancements
- Secure logout functionality
- Password protection

### 📋 Task Management
- Create, read, update, delete tasks
- Task categorization (Personal, Private, Public)
- Due date tracking
- Task status management
- Search and filter capabilities

### 📧 Multi-Channel Notifications
- **Email notifications** via Gmail SMTP
- **WhatsApp notifications** via Twilio
- **SMS support** (disabled for Ghana due to restrictions)
- Customizable notification preferences
- HTML email templates

### 🇬🇭 Ghana Optimizations
- WhatsApp prioritized over SMS (90% usage in Ghana)
- Local timezone support
- Ghana phone number formats
- English language interface

### 📱 Mobile-Responsive Design
- Works on desktop, tablet, and mobile
- Touch-friendly interface
- Modern UI with smooth animations

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Django 5.2.4
- Gmail account with app password
- (Optional) Twilio account for WhatsApp

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/benedictamankw18/todo-list.git
cd todo-list/django-todo/ToDoList
```

2. **Create virtual environment**
```bash
python -m venv .venv
.venv\Scripts\activate  # Windows
```

3. **Install dependencies**
```bash
pip install django python-dotenv requests
```

4. **Environment configuration**
```bash
copy .env.example .env
# Edit .env with your credentials
```

5. **Database setup**
```bash
python manage.py migrate
python manage.py createsuperuser
```

6. **Run the application**
```bash
python manage.py runserver
```

Visit `http://127.0.0.1:8000` to access the application.

## 🇬🇭 Made for Ghana

This system is specifically optimized for Ghana users with local considerations and WhatsApp integration.

Built with ❤️ for Ghana 🇬🇭

**Ready for production deployment! 🚀**
