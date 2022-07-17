# The following routes will allow for this application
# Application has three parts 1) Super admin panel 2) Admin panel,  & 3) User panel
# User panel can not access all routes but admin panel can access all routes except editing user and 
# some low level backend operation
# --------------------------------------------------------------------------
# ROUTES


# USER
# /
# /login
# /register
# /dashboard
# /dashboard/me
# /dashboard/applications
# /dashboard/applications/${applicationId}
# /* [Not Found]

# ADMIN [Analitical Dashboard]
# /
# /login [Common]
# /register [Common]
# /dashboard
# /dashboard/me
# /dashboard/applications
# /dashboard/applications/${applicationId}
# /dashboard/applications/${applicationId}/edit
# /dashboard/applications/${applicationId}/delete 
# /dashboard/users
# /dashboard/users/${userId}/message

# SUPER ADMIN
# /
# /login [Common]
# /register [Common]
# /dashboard
# /dashboard/me
# /dashboard/applications
# /dashboard/applications/${applicationId}
# /dashboard/applications/${applicationId}/edit
# /dashboard/applications/${applicationId}/delete
# /dashboard/users
# /dashboard/users/${userId}/message
# /dashboard/users/${userId}/edit
# /dashboard/users/${userId}/delete [Very Sensative. It is not delete. It will move user to trash.]
# /dashboard/users/${userId}/history
# /dashboard/users/${userId}/history/${date}
# /dashboard/themes
# /dashboard/themes/${themeId}
# /dashboard/themes/active
# /dashboard/logs
# /dashboard/logs/${date}
# /dashboard/payments
# /dashboard/payments/${date}