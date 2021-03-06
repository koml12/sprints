from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from .views import CreateView, DetailsView, SettingsCreateView, SettingsEditView
from rest_framework.authtoken import views as rest_framework_views

app_name = 'tasks'

urlpatterns = [
    url(r'^api/tasks/$', CreateView.as_view(), name='create'),
    url(r'^api/tasks/(?P<pk>[0-9]+)/$', DetailsView.as_view(), name='details'),
    url(r'^api/settings/$', SettingsCreateView.as_view(), name='create-settings'),
    url(r'^api/settings/(?P<pk>[0-9]+)/$', SettingsEditView.as_view(), name='edit-settings'),
    url(r'^api/get_auth_token/$', rest_framework_views.obtain_auth_token, name='get_auth_token'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
