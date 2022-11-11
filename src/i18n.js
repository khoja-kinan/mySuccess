import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
// don't want to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init

i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  // want your translations to be loaded from a professional CDN? => https://github.com/locize/react-tutorial#step-2---use-the-locize-cdn
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: "ar",
    lng: "ar",
    debug: false,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          description: {
            dashboardAppWelcome: "Hi, Welcome back",
            sideBarDashboard: "dashboard",
            sideBarUser: "users",
            sideBarSpecializations: "specializations",
            sideBarprivileges: "privileges",
            sideBarMedals: "medals",
            sideBarCountries: "countries",
            AccountPopoverLogout: "Logout",
            SearchBarSearchButton: "Search",
            SearchBarSearchPlaceholder: "Search…",
            UsersPageTitle: "Users",
            UsersPageNewUser: "  New User",
            NewUserDialogTitle: "Add New user",
            NewUserDialogUsername: "Username",
            NewUserDialogEmail: "Email",
            NewUserDialogPassword: "Password",
            NewUserDialogAccountType: "Account Type",
            NewUserDialogAccountTypeAdmin: "Admin",
            NewUserDialogAccountTypeAdvertiser: "Advertiser",
            NewUserDialogAccountTypeInfluencer: "Influencer",
            NewUserDialogPrivileges: "Privilege",
            NewUserDialogSpecialization: "Specialization",
            NewUserDialogCountry: "Country",
            Cancel: "Cancel",
            Ok: "Ok",
            UsersPageSearchPlaceholder: "Search user...",
            UsersPageTableHeadUsername: "Username",
            UsersPageTableHeadEmail: "Email",
            UsersPageTableHeadStatus: "Status",
            UsersPageTableHeadPendingBalance: "Pending Balance",
            UsersPageTableHeadOverallBalance: "Overall Balance",
            UsersPageTableHeadWithdrawBalance: "Withdraw Balance",
            UsersPageUserStatusWaitingVerification: "Waiting Verification",
            UsersPageUserStatusActive: " Active",
            UsersPageUserStatusDisabled: "Disabled",
            UsersPageEditUserStatus: "Edit Status",
            UsersPageEditUserBalance: "Edit Balance",
            UsersPageLabelRowsPerPage: "Rows Per Page",
            EditUserStatusDialogTitle: "Edit User Status",
            EditUserStatusDialogLabel: "Status",
            EditUserBalanceDialogTitle: "Edit User Balance",
            SpecializationsPageTitle: "Specializations",
            SpecializationsPageAddNew: "New Specialization",
            SpecializationsPageSearchPlaceHolder: "Search Specialization...",

            NewSpecializationsDialogTitle: "Add New Specialization",
            NewSpecializationsDialogArName: "Arabic Name",
            NewSpecializationsDialogEnName: "English Name",
            EditSpecializationButton: "Edit Specialization",
            PrivilegepageTitle: "Privileges",
            PrivilegepageNewButton: "New privilege",
            PrivilegepageEditButton: "Edit privilege",

            NewPrivilegeName: "Privilege Name",
            NewPrivilegeRolesTitle: "Privilege Roles",
            PrivilegepageSearchPlaceholder: "Search Privilege...",
            MedalsPageTabelHeadArName: "Arabic Name",
            MedalsPageTabelHeadEnName: "English Name",
            MedalsPageTabelimage: "Image",
            MedalsPageTitle: "Medals",
            MedalsPageNewButton: "New Medal",
            MedalsPageEditButton: "Edit Medals",
            MedalsPageSearchPlaceholder: "Search Medal...",

            MedalsPageNewImage: "Upload Medal Image",
            CountriesPageTitle: "Countries",
            CountriesPageNewButton: "New Country",
            CountriesPageSearchPlaceholder: "Search Country...",
            CountriesEditPageButton: "Edit Country",
            withdrawRequests: "Withdraw Requests",
            withdrawRequestsPageSearchPlaceholder: "Search for request...",
            amount: "Amount",
            account: "Account",
            type: "Type",
            status: "Status",
            approve: "Approve",
            deny: "Deny",
            WithdrawRequestDeny: "Withdraw Request Deny",
            denyRequest: "Are you sure you want to deny this request ?",
            WithdrawRequestApprove: "Withdraw Request Approval",
            approveRequest: "Are you sure you want to Approve this request ?",
            supportChats: "Support Chats",
            supportChatsPageSearchPlaceholder: "Search for Chat...",
            lastMessage: "Last Message",
            viewAllChat: "View All Chat",
            supportChatUser: "Support Chat for User:",
            send: "Send",
            close: "Close",
          },
        },
      },
      ar: {
        translation: {
          description: {
            dashboardAppWelcome: "أهلاً بك",
            sideBarDashboard: "لوحة التحكم",
            sideBarUser: "المستخدمين",
            sideBarSpecializations: "الاختصاصات",
            sideBarprivileges: "الصلاحيات",
            sideBarMedals: "الميداليات",
            sideBarCountries: "الدول",
            AccountPopoverLogout: "تسجيل الخروج",
            SearchBarSearchButton: "بحث",
            SearchBarSearchPlaceholder: "ابحث هنا ...",
            UsersPageTitle: "المستخدمين",
            UsersPageNewUser: "   إضافة مستخدم",
            NewUserDialogTitle: "إضافة  مستخدم جديد",
            NewUserDialogUsername: "اسم المستخدم",
            NewUserDialogEmail: "الايميل",
            NewUserDialogPassword: "كلمة السر",
            NewUserDialogAccountType: "نوع الحساب",
            NewUserDialogAccountTypeAdmin: "مدير",
            NewUserDialogAccountTypeAdvertiser: "معلن",
            NewUserDialogAccountTypeInfluencer: "مؤثر",
            NewUserDialogPrivileges: "الصلاحية",
            NewUserDialogSpecialization: "الاختصاص",
            NewUserDialogCountry: "المدينة",
            Cancel: "إلغاء",
            Ok: "موافق",
            UsersPageSearchPlaceholder: "ابحث عن مستخدم...",
            UsersPageTableHeadUsername: "اسم المستخدم",
            UsersPageTableHeadEmail: "الايميل",
            UsersPageTableHeadStatus: "حالة المستخدم",
            UsersPageTableHeadPendingBalance: "الرصيد المعلق",
            UsersPageTableHeadOverallBalance: "الرصيد الكلي",
            UsersPageTableHeadWithdrawBalance: "الرصيد المسحوب",
            UsersPageUserStatusWaitingVerification: "بانتظار التأكيد",
            UsersPageUserStatusActive: " فعال",
            UsersPageUserStatusDisabled: "معطل",
            UsersPageEditUserStatus: " تعديل الحالة",
            UsersPageEditUserBalance: " تعديل الرصيد",
            UsersPageLabelRowsPerPage: "عدد الاسطر في الصفحة",
            EditUserStatusDialogTitle: "تعديل حالة المستخدم",
            EditUserStatusDialogLabel: "الحالة",
            EditUserBalanceDialogTitle: "تعديل رصيد المستخدم",
            SpecializationsPageTitle: "الاختصاصات",
            SpecializationsPageSearchPlaceHolder: "ابحث عن اختصاص...",
            SpecializationsPageAddNew: "اضافة اختصاص جديد",
            NewSpecializationsDialogTitle: "اضافة اختصاص جديد",
            NewSpecializationsDialogArName: "الاسم العربي",
            NewSpecializationsDialogEnName: "الاسم الانكليزي",
            EditSpecializationButton: "تعديل الاختصاص",
            PrivilegepageTitle: "الصلاحيات",
            PrivilegepageNewButton: "اضافة صلاحية جديدة",
            NewPrivilegeName: "اسم الصلاحية",
            NewPrivilegeRolesTitle: "سماحيات الصلاحية",
            PrivilegepageSearchPlaceholder: "ابحث عن صلاحية...",
            PrivilegepageEditButton: "تعديل الصلاحية",
            MedalsPageTabelHeadArName: "الاسم العربي",
            MedalsPageTabelHeadEnName: "الاسم الانكليزي",
            MedalsPageTabelimage: "الصورة",
            MedalsPageTabelimage: "الصورة",
            MedalsPageTitle: "الميداليات",
            MedalsPageEditButton: "تعديل الميدالية",
            MedalsPageNewButton: "اضافة ميدالية جديدة",
            MedalsPageNewImage: "اصف صورة الميدالية",
            MedalsPageSearchPlaceholder: "ابحث عن ميدالية...",
            CountriesPageTitle: "المدن",
            CountriesPageNewButton: "اضافة مدينة جديدة",
            CountriesPageSearchPlaceholder: "ابحث عن مدينة...",
            CountriesEditPageButton: "تعديل المدينة",
            withdrawRequests: "طلبات سحب الرصيد",
            withdrawRequestsPageSearchPlaceholder: "ابحث عن طلب...",
            amount: "الكمية",
            account: "الحساب",
            type: "النوع",
            status: "حالة الطلب",
            approve: "تأكيد",
            deny: "رفض",
            WithdrawRequestDeny: "رفض طلب السحب",
            denyRequest: "هل أنت متأكد من رفض هذا الطلب ؟ ",
            WithdrawRequestApprove: "تأكيد طلب السحب",
            approveRequest: "هل أنت متأكد من تأكيد هذا الطلب ؟ ",
            supportChats: "محادثات مركز الدعم",
            supportChatsPageSearchPlaceholder: "ابحث عن محادثة...",
            lastMessage: "أحدث الرسائل",
            viewAllChat: "عرض كل المحادثة",
            supportChatUser: ":محادثة دعم المستخدم",
            send: "إرسال",
            close: "إغلاق",
          },
        },
      },
    },
  });

export default i18n;
/* 
   
   {t("description.MedalsPageSearchPlaceholder")} 
   
   const { t } = useTranslation();
   
   
   */
