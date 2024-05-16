from py4web import action, request, abort, redirect, URL
from yatl.helpers import A
from .common import db, session, T, cache, auth, logger, authenticated, unauthenticated, flash
from py4web.utils.url_signer import URLSigner
from .models import get_user_email
from py4web.utils.form import Form, FormStyleBulma
from py4web.utils.grid import Grid, GridClassStyleBulma
#from py4web import Field, IS_NOT_EMPTY, IS_EMAIL
import datetime

# Home page action
@action('index')
@action.uses('index.html', db, auth.user)
def index():
    return dict(
        create_form_url = URL('create_form')
    )

# Create a new post
@action('create_form', method="POST")
@action.uses(db, auth.user, session)
def create_form():
    new_form = request.json.get('new_form')
    form_id = db.form.insert(form=new_form)
    print("New form created with id: ", form_id)
    return dict(form=new_form, form_id=form_id)