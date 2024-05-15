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
        submit_request_url = URL('contact_us', 'create_post', signer=URLSigner()),
    )

# Create a new post
@action('submit_request', method="POST")
@action.uses(db, auth.user, session)
def submit_request():
    new_request = request.json.get('new_request')
    request_id = db.post.insert(request=new_request)
    print("New request created with id: ", request_id)
    return ((redirect(URL('index'))))