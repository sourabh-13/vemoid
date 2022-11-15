const express = require("express");
const sql = require("./config/dbConnection");
const Users = require('./controller/settings/users');
const Country = require('./controller/country')
const State = require('./controller/state');
const City = require('./controller/city');
const GetSettingData = require("./controller/settings/getSettingData");
const ResetPassword = require("./controller/resetPassword");
const ManageAdmins = require("./controller/ManageAdmin/manageadmins");
const GetAdminAppUser = require("./controller/ManageAdmin/getAdminAppuser")
const ManageAdminDetails = require("./controller/ManageAdmin/manageadminsdetails")
const GetMerchantapplist = require("./controller/ManageAdmin/getMerchantApplist")
const ManageUpdateAdmin = require("./controller/ManageAdmin/manageEditAdmin");
const ManageMerchants = require("./controller/ManageMerchants/manageMerchants");
const getAdminApplication = require('./controller/ManageAdmin/getAdminApplication')
const AddMerchants = require("./controller/ManageMerchants/AddMerchants")
const ManageMerchantDetails = require("./controller/ManageMerchants/ManageMerchantsDetails")
const EditMerchantData = require("./controller/ManageMerchants/editMerchant");
const DeleteMerchantData = require("./controller/ManageMerchants/deleteMerchantData")
const getMerchantApp = require('./controller/ManageMerchants/getMerchantApp')
const ManageAdminsDelete = require("./controller/ManageAdmin/manageadminsdelete");
const Addadmin = require("./controller/ManageAdmin/addAdmin");
const GetAdminMerchantData = require('./controller/ManageAdmin/getMerchantData')
const CreateFaq = require("./controller/FAQ/createFaq");
const ReadFaq = require("./controller/FAQ/readfaq");
const GetFaqdata = require("./controller/FAQ/getfaq");
const UpdateFaqData = require("./controller/FAQ/updateFaq");
const DeleteFaqData = require("./controller/FAQ/deleteFaq");
const ContactInquiries = require("./controller/contactInquiries/inquiries");
const DeleteInquiries = require("./controller/contactInquiries/deleteInquiries");
const CreateTerms = require("./controller/terms&services/termServices");
const GetTerms = require("./controller/terms&services/getTerms");
const createPrivacyPolicy = require("./controller/privacy&policy/createPrivacy"); 
const getPrivacyPolicy = require("./controller/privacy&policy/getPrivacy");
const SendNotifications = require("./controller/notifications/sendNotification");
const getNotifications = require("./controller/notifications/getnotifications");
const DeleteNotifications = require("./controller/notifications/deletenotifications");
const Createsubscriptionsplan = require("./controller/Subscriptionplan/createsubscription");
const CreateContactDetails = require("./controller/contactdetails/createContact");
const GetContactDetails = require("./controller/contactdetails/getContactDetails");
const GetNotificationsDetails = require("./controller/notifications/getNotificationdetails");
const GetContactInquiries = require("./controller/contactInquiries/getContactInquiries");
const ReceiveNotificatons = require("./controller/notifications/receiveNotification");
const RemoveReceiveNotifications = require("./controller/notifications/removeReceive Notifications");
const GetSubscription = require("./controller/Subscriptionplan/getsubscription");
const DeleteSubscription = require("./controller/Subscriptionplan/deleteSubscription");
const EditSubscription = require("./controller/Subscriptionplan/editsubscription");
const ReadSubcription = require("./controller/Subscriptionplan/readsubscription");
const UpdateSubscriptionStatus = require("./controller/Subscriptionplan/updateStatus")
const ForgetPassword = require("./controller/forgotPassword")
const updateAdminStatus = require("./controller/ManageAdmin/updateStatus")
const GetCustomerByEmail = require("./controller/customer/getCustomerByEmail");
const GetCustomerByDocumentTypeAndNumber = require("./controller/customer/getCustomerByDocumentTypeAndNumber");
const ManageDocuments = require("./controller/verification/getDocuments")
const ManageSendDocuments = require("./controller/verification/sendRequestDocuments")

//Admin
const SendInquiry = require("././vemo-id-backend-admin/controller/contactus/sendInquiry")
const GetAdminSendData = require("./vemo-id-backend-admin/controller/notifications/getAdminSendNotification")
const GetAdminNotification = require("./vemo-id-backend-admin/controller/notifications/getAdminData")
const RemoveAdminNotification = require("./vemo-id-backend-admin/controller/notifications/removeAdminNotification")
const SendAdminNotification = require("./vemo-id-backend-admin/controller/notifications/sendAdminNotification")
const DeleteSendNotification = require("./vemo-id-backend-admin/controller/notifications/deleteSendNotification")
const GetAdminSendDetails = require("./vemo-id-backend-admin/controller/notifications/getAdminSendNotificationDetails")
const AddAdminMerchant = require("./vemo-id-backend-admin/controller/ManageMerchant/addMerchant")
const GetMerchantDetails = require("./vemo-id-backend-admin/controller/ManageMerchant/merchantDetails")
const GetMerchant = require("./vemo-id-backend-admin/controller/ManageMerchant/getMerchant")
const EditMerchant = require("./vemo-id-backend-admin/controller/ManageMerchant/editMerchant")
const DeleteMerchant = require("./vemo-id-backend-admin/controller/ManageMerchant/merchantDelete")
const AddEnduser = require("./vemo-id-backend-admin/controller/MangeEnduser/addEnduser")
const GetEndUserData = require("./vemo-id-backend-admin/controller/MangeEnduser/getEndUser")
const getSubscriptionPlan = require("./vemo-id-backend-admin/controller/Subscription/getSubscription")

//merchant
const SendMerchantNotification = require("./vemo-id-backend-merchant/contorller/notification/sendnotification")
const GetMerchantData = require("./vemo-id-backend-merchant/contorller/notification/getMerchant")
const GetMerchantSendData = require("./vemo-id-backend-merchant/contorller/notification/getMerchantSendNotificaton")
const CreateApplicaton = require("./vemo-id-backend-merchant/contorller/ManageApplication/createApplication")
const GetAppData = require("./vemo-id-backend-merchant/contorller/ManageApplication/getAppData")
const GetApplicationDetail = require("./vemo-id-backend-merchant/contorller/ManageApplication/getApplicationDetail")
const ApplicationDelete = require('./vemo-id-backend-merchant/contorller/ManageApplication/applicationDelete')
const EditApplication = require('./vemo-id-backend-merchant/contorller/ManageApplication/editApplication')
const AddMetaData = require('./vemo-id-backend-merchant/contorller/ManageApplication/addMetaDeta')
const GetMetaData = require('./vemo-id-backend-merchant/contorller/ManageApplication/getMetaData')
const EditMetaData = require('./vemo-id-backend-merchant/contorller/ManageApplication/editMetaData')
const getEditMetaData = require('./vemo-id-backend-merchant/contorller/ManageApplication/getEditMetaData')
const DeleteMetaData = require('./vemo-id-backend-merchant/contorller/ManageApplication/DeleteMetaData')
const GetAppuserlist = require('./vemo-id-backend-merchant/contorller/ManageApplication/getAppusers')
const TransactionList = require('./vemo-id-backend-merchant/contorller/ManageApplication/getTransaction')
const AppStatus = require('./vemo-id-backend-merchant/contorller/ManageApplication/updateAppStatus')
const UpdateAppuser = require('./vemo-id-backend-merchant/contorller/ManageApplication/updateAppUser')

// vemo-id-MobileApp
const setFaceAuthentication = require('./vemo-id-backend-mobile/controller/Authentication/faceAuthentication')
const GetUserDetails = require('./vemo-id-backend-mobile/controller/Authentication/getUserDetails')
const RecordDetails = require('./vemo-id-backend-mobile/controller/Authentication/recordDetails')
const CheckActivationCodeAuth = require('./vemo-id-backend-mobile/controller/Authentication/checkActivationCode')
const getLoginType = require('./vemo-id-backend-mobile/controller/Authentication/getLoginTypeAppUser')
const improveVamoIdApp = require('./vemo-id-backend-mobile/controller/Authentication/improveVamoIdApp')
const AuthenticationWithPasscodeOtp = require('./vemo-id-backend-mobile/controller/Authentication/authenticationWithPasscodeOtp')
const checkSecurityCode = require('./vemo-id-backend-mobile/controller/Authentication/checkSecurityCode')
const checkSecurityCodeChangeOtp = require('./vemo-id-backend-mobile/controller/Authentication/checkSecurityCodeChangeOtp')
const sendActivationCode = require('./vemo-id-backend-mobile/controller/Authentication/sendActivationCode')
const AuthenticationAuthApi = require('./vemo-id-backend-mobile/controller/Authentication/authenticationAuthApi')
const RequestSignature = require('./vemo-id-backend-mobile/controller/Authentication/checkSendActivationCode')
const AppAuthenticationWithPassCode = require('./vemo-id-backend-mobile/controller/Authentication/appAuthenticationWithPasscode')
const ChangeSecurityCode = require('./vemo-id-backend-mobile/controller/Authentication/changeSecurityCode')
const GetTransactionByID = require('./vemo-id-backend-mobile/controller/Authentication/getTransactionById')
const GetTransactionByDocumentType = require('./vemo-id-backend-mobile/controller/Authentication/retrieveTransactionsByDocumentTypeNumber')
const retrieveTransactionByEmail = require('./vemo-id-backend-mobile/controller/Authentication/retrieveTransactionByEmail')
const retrieveTransactionByMetaData = require('./vemo-id-backend-mobile/controller/Authentication/retrieveTransactionsByMetadata')
const updateUserProfileImage = require('./vemo-id-backend-mobile/controller/Authentication/updateUserProfile')

//network ip
const ni = require('network-interfaces');
const os = require('os');

const cors = require("cors");

const app = express();
const Port = 5000;
const bcrypt = require('bcryptjs');
const md5Hash = require('crypto-js');
var nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require("path");
const multer = require("multer");
const morgan = require('morgan');
const contentType = require('content-type')
const http = require('http');
const formidable = require('formidable');



app.use(express.static('public')); 
app.use('/uploads', express.static('uploads'));


app.set('trust proxy', true);
app.use(cors());
app.use(morgan('dev'));



app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended:false}))



const fs = require('fs');
const https = require('https');

const cert = fs.readFileSync('certs/__vamo_id.crt');
const ca = fs.readFileSync('certs/__vamo_id.ca-bundle');
const key = fs.readFileSync('certs/private.key');

let options = {
  cert: cert, 
  ca: ca, 
  key: key 
};

const optionsIP = {
  internal: false, // boolean: only acknowledge internal or external addresses (undefined: both)
  ipVersion: 4     // integer (4 or 6): only acknowledge addresses of this IP address family (undefined: both)
};

//const ips = ni.toIps('eth0', optionsIP);

if (process.env.NODE_ENV == 'production') {
  https.createServer(options, app).listen(Port, function() {
    console.log(`serever is runing at port ${Port}`);
  });
}

app.get('/hello', (req, res) => {
  res.send('Hello World!');
  //console.log(`${ips}`);
  //let ips = os.networkInterfaces()[ni.getInterface(optionsIP)];
  //console.log(ips[0].address);
})


app.post("/login", (req, res) => {
 
  
  if (!req.body.login && req.body.login == null) {
    return res.status(400).send({
      success: "false",
      msg: "email  is empty!",
    });
  }
  if (!req.body.password && req.body.password == null) {
    return res.status(400).send({
      success: "false",
      msg: "password is empty!",
    });
  }
  var encryptPassowrd = md5Hash.MD5(req.body.password);
  //`SELECT * FROM tbl_users WHERE email = ${sql.escape(req.body.login)} AND password=${(encryptPassowrd)}`
  sql.query(
    'SELECT * FROM tbl_users WHERE password="'+ encryptPassowrd +'" AND email ="'+req.body.login+'"',
    (err, result) => {
     // console.log(result);
      // user does not exists
      if (err) {
        throw err; 
        return res.status(400).send({
          msg: err,
        });
      }
      if (!result.length) {
        return res.status(401).send({
          success: "false",
          msg: "Email or password is incorrect!",
        });
      } 
      else{
        return res.status(200).send({
                  success:'true',
                  msg: 'Login Successfully!',
                  user: result[0]
                });
      }

      

    }
  );
});


//upload image
  const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
      cb(null,"./public/image")
    },
    filename:(req,file,cb)=>{
      //console.log(file)
      cb(null,new Date().getTime() + path.extname(file.originalname));
      //cb(null,file.fieldname)
      //cb(null,)
    }
  })


const imageFilter = function (req, file, cb) {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg"
   
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
  }
};

const upload = multer({storage: storage,fileFilter:imageFilter,limits:{fileSize:1024*1024*10}},)


//upload image




app.post('/updateadmin',upload.single('company_image'),Users.userEdit);
app.post('/updateStatus',updateAdminStatus.updateStatus)
app.post("/getsettingsdata",GetSettingData.getsettingdata)
app.get('/countriesList', Country.countriesList);
app.post('/statesList', State.statesList);
app.post('/citiesList', City.citiesList);
app.post('/resetpassword',ResetPassword.userResetPassword);
app.get('/manageadmins',ManageAdmins.manageAdminList);
app.post('/getadminapplicationlist',getAdminApplication.getAdminapp)
app.post('/manageadmindetails',ManageAdminDetails.manageAdminDetails);
app.post('/get-app-user',GetAdminAppUser.getAppuser)
app.post('/getmerchantapplist',GetMerchantapplist.getMerchantapp)
app.post('/manageupdateadmin',upload.single('company_image'),ManageUpdateAdmin.manageEditAdmin);
app.post("/admindatadelete",ManageAdminsDelete.manageAdminDelete);
app.post("/addadmin",upload.single('company_image'),Addadmin.admindata);
app.post('/admin/getmerchantdata', GetAdminMerchantData.getMerchantsData);
app.post("/managemerchants",ManageMerchants.manageMerchantsList);
app.post("/managemerchantsdetails",ManageMerchantDetails.manageMerchantDetails);
app.post("/admin/getmerchantapplist", getMerchantApp.getmerchantapplist);
app.post("/addmerchants",upload.single('company_image'),AddMerchants.addMerchant);
app.post("/editmerchant",upload.single('company_image'),EditMerchantData.editmerchantdata);
app.post("/deletemerchant",DeleteMerchantData.deletemerchantdata);
app.post("/createfaq",CreateFaq.cretefaqq );
app.get("/readfaq",ReadFaq.readfaq);
app.post("/getFaqDetails", GetFaqdata.getfaq);
app.put("/updatefaqdata",UpdateFaqData.updatefaq);
app.post("/deletefaqdata",DeleteFaqData.deletefaq);
app.post("/deleteinquiriesdata",DeleteInquiries.deleteinquiries);
app.get("/getprivacypolicy",getPrivacyPolicy.getprivacy);
app.get("/gettermsandservices", GetTerms.getterms);
app.post("/createtermsandservices",CreateTerms.createterms)
app.post("/createprivacy",createPrivacyPolicy.createprivacy)
app.get("/contactinquiries",ContactInquiries.inquirieslist);
app.post("/sendnotification",SendNotifications.sendnotifications);
app.post("/getnotifications",getNotifications.getnotification);
app.post("/getnotificationsdetails",GetNotificationsDetails.getnotificationdetails)
app.post("/deletenotifications",DeleteNotifications.deletenotifications);
app.get("/receivenotificatons",ReceiveNotificatons.receivenotification);
app.post("/removereceivenotifications",RemoveReceiveNotifications.removereceivenotifications);
app.post("/createsubscriptionsplan",Createsubscriptionsplan.createsubscription);
app.get("/getsubscriptions",GetSubscription.getsubscription);
app.post("/deletesubscription",DeleteSubscription.deletesubscription);
app.post("/editsubscription",EditSubscription.editsubcription);
app.post("/readsubscription",ReadSubcription.readsubscription);
app.post("/updateSubscriptionStatus",UpdateSubscriptionStatus.updatestatus);
app.post("/createcontactdetails", CreateContactDetails.createcontact);
app.get("/getcontactdetails", GetContactDetails.getcontact);
app.post("/getinquiriesdetails",GetContactInquiries.getinquirieslist);
app.post("/forgetpassword",ForgetPassword.forgetpassword)
app.post("/getCustomerByEmail",GetCustomerByEmail.getCustomer);
app.post("/getCustomerByDocumentTypeAndNumber", GetCustomerByDocumentTypeAndNumber.getCustomerDocument);
app.post("/getDocumentsVerification", ManageDocuments.ManageDocuments);
app.post("/send-requests-documents", ManageSendDocuments.ManageSendDocuments);
app.get("/get-requests-documents", ManageSendDocuments.ManageGetDocuments);



// vemo-id-backend-Admin 
app.post("/sendinquiry",SendInquiry.sendinquiry)
app.post("/getadminnotification", GetAdminNotification.getadmindata);
app.post("/removeadminnotification",RemoveAdminNotification.removeadminnotifications);
app.post("/sendadminnotification",SendAdminNotification.sendadminnotification);
app.post("/getadminsendnotification",GetAdminSendData.getadminsenddata);
app.post("/deletesendnotification",DeleteSendNotification.deletesendnotifications);
app.post("/getadminsendnotificationdetails",GetAdminSendDetails.getadminnotificationdetails);
app.post("/addadminmerchant",upload.single('company_image'),AddAdminMerchant.addAdminMerchant);
app.post("/getmerchantdetails", GetMerchantDetails.getmerchantdetails);
app.post("/getmerchant",GetMerchant.getmerchantdata);
app.post("/admin/editmerchant",upload.single('company_image'),EditMerchant.editmerchantdata);
app.post("/admin/deletemerchant",DeleteMerchant.merchantDataDelete);
app.post("/admin/add-end-user",AddEnduser.addEnduser);
app.post("/admin/get-enduser-data",GetEndUserData.getEnduserData)
app.get("/get-subscription-plan", getSubscriptionPlan.getsubscriptionplan)



//vemo-id-backend-Merchant
app.post("/sendmerchantnotification",SendMerchantNotification.sendmerchantnotification);
app.post("/getmerchantnotification",GetMerchantData.getmerchantdata);
app.post("/getmerchantsendnotification",GetMerchantSendData.getmerchantsendnotification);
app.post("/merchant/create-application",CreateApplicaton.createApplication);
app.post("/merchant/getappuserdata", GetAppData.getappuserdata)
app.post("/merchant/getapplicationdetail",GetApplicationDetail.getApplicationDetail)
app.post("/merchant/application-delete",ApplicationDelete.applicationDelete)
app.post("/merchant/edit-application",upload.single('appLogo'),EditApplication.editApplication)
app.post("/addmetadata",AddMetaData.addmetadata)
app.post("/getmetadata",GetMetaData.getmetadata)
app.post("/editmetadata", EditMetaData.editMetaData)
app.post("/get-editmeta-data", getEditMetaData.GetEditMetaData)
app.post("/delete-meta-data",DeleteMetaData.deleteMetaData)
app.post("/get-appuserlist",GetAppuserlist.getAppUserList)
app.post("/getTransactionList",TransactionList.getTransactionList)
app.post("/changeAppStatus",AppStatus.UpdateAppStatus)
app.post("/updateAppUser",UpdateAppuser.updateAppuser)


//vemo-id-Mobile Api
app.post("/api/mobile/setAuthenticationWithFaceBiometric",upload.none([]),setFaceAuthentication.FaceAuthentication)
app.post("/api/mobile/getUserDetails",upload.none([]),GetUserDetails.getUserDetails)
app.post("/api/mobile/recordDetails",upload.none([]),RecordDetails.recordDetails)
app.post("/api/mobile/checkActivationCodeAuthentication",upload.none(['activationcode','idNumber','deviceToken']),CheckActivationCodeAuth.checkActivation)
app.post("/api/mobile/getLoginTypeAppUserWhileQrCodeScanning",upload.none([]),getLoginType.GetLoginTypeUser)
app.post("/api/mobile/improveVamoIdApp",upload.none([]),improveVamoIdApp.ImproveVamoIdApp)
app.post("/api/mobile/authenticationWithPasscodeOtp",upload.none([]),AuthenticationWithPasscodeOtp.authenticationWithPasscodeOTP)
app.post("/api/mobile/checkSecurityCode",upload.none(['deviceToken','code']),checkSecurityCode.checkSecurityCode)
app.post("/api/mobile/checkSecurityCodeChangeOtp",upload.none([]),checkSecurityCodeChangeOtp.checkSecurityCodeChangeOtp)
app.post("/api/mobile/createSecurityCode",upload.none(['deviceToken','code']),checkSecurityCodeChangeOtp.createSecurityCode)
app.post("/api/mobile/my_history",upload.none([]),checkSecurityCodeChangeOtp.myHistory)
app.post("/api/mobile/aboutUs",upload.none([]),checkSecurityCodeChangeOtp.aboutUs)
app.post("/api/mobile/appRejectAuthenticationWithPasscode",upload.none([]),checkSecurityCodeChangeOtp.appRejectAuthenticationWithPasscode)
app.post("/api/mobile/updateDeviceToken",upload.none([]),checkSecurityCodeChangeOtp.updateDeviceToken)
app.post("/api/mobile/authenticateLoginAppUserByLoginType",upload.none([]),checkSecurityCodeChangeOtp.authenticateLoginAppUserByLoginType)
app.post("/api/mobile/loginAppUserWithQrCode",upload.none([]),checkSecurityCodeChangeOtp.loginAppUserWithQrCode)
app.post("/api/mobile/send-activation-code",upload.none(['language','applicationid','name','email','phone','country','documentType','documentNumber','metadata']),sendActivationCode.SendActivationCode)
app.post("/api/authentication_auth_api",upload.none([]),AuthenticationAuthApi.authenticationAuthApi)
app.post("/api/request-signature",upload.none([]),RequestSignature.requestSignature)
app.post("/api/mobile/changeSecurityCode",upload.none([]),ChangeSecurityCode.changeSecurityCode)
app.post("/mobile/appAuthenticationWithPasscode",upload.none([]),AppAuthenticationWithPassCode.appAuthenticationWithPasscode)
app.post("/api/retrieveTransactionsByTransactionID",upload.none([]),GetTransactionByID.retrieveTransactionsByTransactionID)
app.post("/api/retrieveTransactionsByDocumentTypeNumber",upload.none([]),GetTransactionByDocumentType.retrieveTransactionsByDocumentTypeNumber)
app.post("/api/retrieveTransactionByEmail",upload.none([]),retrieveTransactionByEmail.retrieveTransactionByEmail)
app.post("/api/retrieveTransactionByMetadata",upload.none([]),retrieveTransactionByMetaData.retrieveTransactionByMetaData)
app.post("/api/mobile/updateUserProfileImage",upload.single('profile_image'),updateUserProfileImage.updateProfie)
//web Authentication api

app.post("/webAuth/getMetadata",checkSecurityCodeChangeOtp.getMetaDataWebAuth)
app.post("/webAuth/getApplicationDetailstaWebAuth",checkSecurityCodeChangeOtp.getApplicationDetailstaWebAuth)
app.post("/webAuth/validateNewRegisteredUserWebAuth",checkSecurityCodeChangeOtp.validateNewRegisteredUserWebAuth)
app.post("/webAuth/rejectAuthenticationWebAuth",checkSecurityCodeChangeOtp.rejectAuthenticationWebAuth)
app.post("/webAuth/updateValidateRegisteredUserWebAuth",checkSecurityCodeChangeOtp.updateValidateRegisteredUserWebAuth)
app.post("/webAuth/updateStateExpired",checkSecurityCodeChangeOtp.updateStateExpirationTrans)
app.post("/webAuth/resendAuthenticationOtpWebAuth",checkSecurityCodeChangeOtp.resendAuthenticationOtpWebAuth)



app.get('/', function (req, res) {
   res.send('Har Har Mahadev Har Har Mahadev');
})
app.get('/jaisriram', function (req, res) {
   res.send('Jay Sri Ram Jay Sri Ram');
})



if (process.env.NODE_ENV == 'develop') {
  app.listen(Port,'192.168.1.80', () => {
    console.log(`Server run on ${Port} successfully`);
  });
}

app.listen(Port,()=>{
  console.log(`app listening on port ${Port}`)
})





