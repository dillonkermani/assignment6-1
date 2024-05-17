from py4web import action, request, abort, redirect, URL
from yatl.helpers import A
from .common import db, session, T, cache, auth, logger, authenticated, unauthenticated, flash
from py4web.utils.url_signer import URLSigner
from .models import get_user_email
from py4web.utils.form import Form, FormStyleBulma
from py4web.utils.grid import Grid, GridClassStyleBulma
import datetime

def validate_form(form):
    if not form.vars["name"]:
        form.errors["name"] = "Name is required"
    if not form.vars["email"]:
        form.errors["email"] = "Email is required"
    if not form.vars["phone"]:
        form.errors["phone"] = "Phone is required"
    if not form.vars["message"]:
        form.errors["message"] = "Message is required"

# Home page action
@action('index/<path:path>', method=['POST', 'GET'])
@action('index', method=['POST', 'GET'])
@action.uses('index.html', db, auth)
def index(path=None):
    form = Form(db.form, validation=validate_form, formstyle=FormStyleBulma)
    if form.accepted:
        redirect(URL('index'))
    return dict(
        form=form,
    )

@action('contact_requests', method=["GET", "POST"])
@action('contact_requests/<path:path>', method=['POST', 'GET'])
@action.uses('contact_requests.html', db, auth.user)
def contact_requests(path = None):
    user_email = get_user_email()
    if user_email and user_email == "admin@example.com":
        grid = Grid(path,
                formstyle=FormStyleBulma,
                grid_class_style=GridClassStyleBulma,
                query=(db.form.id),
                orderby=(~db.form.id),                
                search_queries=[['Search by Name', lambda val: db.form.name.contains(val)], 
                                ['Search by Message', lambda val: db.form.message.contains(val)]]
        )
        return dict(
            contact_requests_url = URL('contact_requests'),
            load_all_forms_url = URL('load_all_forms'),
            delete_form_url = URL('delete_form'),
            grid = grid
            )
    else:
        redirect(URL('index'))

# Create a new post
@action('create_form', method="POST")
@action.uses(db, auth.user, session)
def create_form():
    new_form = request.json.get('new_form')
    form_id = db.form.insert(name=new_form['name'], email=new_form['email'], phone=new_form['phone'], message=new_form['message'])
    print("New form created with id: ", form_id)
    redirect(URL('index'))
    return dict(form=new_form, form_id=form_id)

@action('load_all_forms', method="GET")
@action.uses(db, auth.user, session)
def load_all_forms():
    forms = db(db.form).select().as_list()
    return dict(forms=forms)

@action('delete_form', method="POST")
@action.uses(db, auth.user, session)
def delete_form():
    form_id = request.json.get('form_id')
    db(db.form.id == form_id).delete()
    return dict(success=True)