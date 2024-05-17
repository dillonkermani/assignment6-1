"""
This file defines the database models
"""

import datetime
from .common import db, Field, auth


def get_user_email():
    return auth.current_user.get('email') if auth.current_user else None


def get_time():
    return datetime.datetime.utcnow()


# Complete. 
db.define_table(
    'form',
    Field('name', 'string'),
    Field('email', 'string'),
    Field('phone', 'string'),
    Field('message', 'text'),
    # Field('timestamp', 'datetime', default=lambda: datetime.datetime.utcnow()),
)

db.commit()