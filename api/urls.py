from django.urls import path
from . import views

urlpatterns = [
    path("", views.api_overview, name="api-overview"),
    path("solve/", views.solve, name="solve"),
]