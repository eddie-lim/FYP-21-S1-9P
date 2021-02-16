export default Constants = {
    MAXIMUM_PROFILE_PICTURE_SIZE_IN_BYTE: 8388608, // 8MB (base 2)

    //error code
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    UNPROCESSABLE_ENTITY: 422,
    TOO_MANY_REQUEST: 429,
    SERVER_ERROR: 500,

    KEY_INVALID_CREDENTIALS: "invalid_credentials",
    KEY_INVALID_OR_EXPIRED_TOKEN: "invalid_or_expired_token",
    KEY_ACCOUNT_DISABLED: "account_disabled",
    KEY_ACCOUNT_OVER_MAX_LOGIN_ATTEMPT: "account_over_max_login_attempt",
    KEY_ACCOUNT_SUSPENDED: "account_suspended",
    KEY_EMAIL_ALREADY_VERIFIED: "email_already_verified",
    KEY_EMAIL_NOT_REGISTERED: "email_not_registered",
    KEY_EMAIL_NOT_VERIFIED: "email_not_verified",

    //under cooldown for resend email or token
    KEY_WAIT_FOR_COOLDOWN: "wait_for_cooldown",
    KEY_SYSTEM_UNDER_MAINTENANCE: "system_under_maintenance",
    //Cannot save to DB for whatever reason
    KEY_UNEXPECTED_ERROR: "unexpected_error",

    CHANNELID: "notification-channel",
    FCM_TOPIC: "system",
    
    STATUS_ENABLED:"enabled",
    STATUS_DISABLED: "disabled",

    // Dialogs in MainLogic
    DIALOG_POPUP_MESSAGE: "dialog_popup_message",
    DIALOG_SYSTEM_MAINTENANCE: "dialog_system_maintenance",
    DIALOG_NEW_UPDATE_MAJOR: "dialog_new_update_major",
    DIALOG_NEW_UPDATE_MINOR: "dialog_new_update_minor",
    DIALOG_NO_INTERNET: "dialog_no_internet",
    DIALOG_GET_SERVER_STATUS_FAILED: "dialog_get_server_status_failed",
    DIALOG_ROOTED_DEVICE: "dialog_rooted_device",

    // fcm action type
    ACTION_TYPE_SYSTEM_ALERT : "system_alert",
    ACTION_TYPE_FORCE_LOGOUT : "force_logout",
    ACTION_TYPE_FORCE_LOGOUT_WITH_ALERT : "force_logout_with_alert",
    ACTION_TYPE_DAILY_RESYNC : "daily_resync",
    ACTION_TYPE_CUSTOM_DIALOG : "custom_dialog",
    
    FLATLIST_PAGESIZE : 20
}