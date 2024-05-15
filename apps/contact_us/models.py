"""
This file defines the database models
"""

import datetime
from .common import db, Field, auth


def is_not_empty(value):
    if value and value.strip():
        return (value, None)
    else:
        return (value, 'Field cannot be empty')


def get_user_email():
    return auth.current_user.get('email') if auth.current_user else None


def get_time():
    return datetime.datetime.utcnow()


# Complete. 
db.define_table(
    'request',
    Field('name', requires=is_not_empty),
    Field('email', requires=is_not_empty),
    Field('phone', requires=is_not_empty),
    Field('message', 'text', requires=is_not_empty),
    # Field('timestamp', 'datetime', default=lambda: datetime.datetime.utcnow()),
)

db.commit()