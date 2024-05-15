from py4web import action, request, abort, redirect, URL
from yatl.helpers import A
from .common import db, session, T, cache, auth, logger, authenticated, unauthenticated, flash
from py4web.utils.url_signer import URLSigner
from .models import get_user_email
from py4web.utils.form import Form, FormStyleBulma
from py4web.utils.grid import Grid, GridClassStyleBulma
from py4web import Field, IS_NOT_EMPTY, IS_EMAIL
import datetime

# Complete. 

db.define_table(
    'request',
    Field('name', requires=IS_NOT_EMPTY()),
    Field('email', requires=IS_EMAIL()),
    Field('phone', requires=IS_NOT_EMPTY()),
    Field('message', 'text', requires=IS_NOT_EMPTY()),
    Field('timestamp', 'datetime', default=lambda: datetime.datetime.utcnow()),
)

db.commit()