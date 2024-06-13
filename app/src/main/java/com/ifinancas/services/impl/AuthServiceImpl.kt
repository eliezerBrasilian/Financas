package com.ifinancas.services.impl

import android.os.Build
import android.util.Log
import androidx.annotation.RequiresApi
import com.foodfacil.enums.Collections
import com.google.firebase.FirebaseTooManyRequestsException
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.FirebaseAuthInvalidCredentialsException
import com.google.firebase.auth.FirebaseAuthInvalidUserException
import com.google.firebase.auth.FirebaseAuthUserCollisionException
import com.google.firebase.firestore.FieldValue
import com.google.firebase.firestore.FirebaseFirestore
import com.ifinancas.data.dataclass.FirebaseUserResponse
import com.ifinancas.data.dataclass.UserAuthSignUpData
import com.ifinancas.services.AuthService
import com.ifinancas.utils.AppTag
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.tasks.await
import kotlinx.coroutines.withContext
import java.time.Instant
import javax.inject.Inject

class AuthServiceImpl @Inject constructor(
    private val auth: FirebaseAuth,
    private val firestore: FirebaseFirestore
) : AuthService {

    override suspend fun login(
        email: String, password: String,
        onSuccess: (user: FirebaseUserResponse) -> Unit, onError: (errorCode: String) -> Unit
    ) {

        try {
            Log.i(AppTag, "clicked")
            val authResponse = auth.signInWithEmailAndPassword(email, password).await()

            val userdata = authResponse.user
            val userUid = userdata!!.uid

            val userDataFromFirestore = retrieveUserDataFromFirestore(userUid)
            if (userDataFromFirestore != null) {
                val user = firestoreUserMaptoFirebaseUserResponse(userDataFromFirestore)
                Log.d(AppTag, userDataFromFirestore.toString())

                onSuccess(user)
            }

        } catch (e: FirebaseAuthInvalidUserException) {
            Log.e(AppTag, "FirebaseAuthInvalidUserException : ${e}")
            Log.e(AppTag, "error code: ${e.errorCode}")
            Log.e(AppTag, "login message: ${e.message}")

            onError(e.errorCode)
            // else Toast(context).showToast(e.message.toString())
        } catch (e: FirebaseAuthInvalidCredentialsException) {
            Log.e(AppTag, "FirebaseAuthInvalidCredentialsException : ${e}")
            Log.e(AppTag, "error code: ${e.errorCode}")
            Log.e(AppTag, "login message: ${e.message}")

            onError(e.errorCode)
        } catch (e: FirebaseTooManyRequestsException) {
            Log.e(AppTag, "FirebaseTooManyRequestsException : ${e}")

            onError("TOO_MANY_REQUESTS")
        }
    }

    @RequiresApi(Build.VERSION_CODES.O)
    override suspend fun signUp(
        email: String,
        password: String,
        name: String,
        onSuccess: (user: UserAuthSignUpData) -> Unit,
        onError: (errorCode: String) -> Unit
    ) {

        try {
            withContext(Dispatchers.IO) {
                val authResult = auth.createUserWithEmailAndPassword(email, password).await()
                withContext(Dispatchers.Main) {

                    val uid = authResult.user!!.uid

                    val instant = Instant.now();

                    val userData = UserAuthSignUpData(
                        uid,
                        email,
                        name,
                        null,
                        false,
                        false,
                        instant.toEpochMilli(),
                    );

                    saveUserOnFirestore(userData)
                    createCollectionBalancesRelatedToTheUser(uid)
                    onSuccess(userData)
                }
            }
        } catch (e: FirebaseAuthInvalidCredentialsException) {
            Log.e(AppTag, "FirebaseAuthInvalidUserException : ${e}")
            Log.e(AppTag, "error code: ${e.errorCode}")
            Log.e(AppTag, "login message: ${e.message}")

            onError(e.errorCode)
        } catch (e: FirebaseAuthUserCollisionException) {
            Log.e(AppTag, "FirebaseAuthUserCollisionException : ${e}")
            Log.e(AppTag, "error code: ${e.errorCode}")
            Log.e(AppTag, "login message: ${e.message}")

            onError(e.errorCode)
        }
    }

    private suspend fun saveUserOnFirestore(userData: UserAuthSignUpData) {
        try {
            firestore.collection(Collections.USERS).document(userData.uid)
                .set(userData)
                .addOnSuccessListener { it ->
                    Log.d(AppTag, "user created")
                }.await()
        } catch (error: Exception) {
            Log.d(AppTag, "error on creating user - saveUserOnFirestore: " + error);
        }
    }

    private suspend fun createCollectionBalancesRelatedToTheUser(userUid: String) {
        firestore.collection(Collections.BALANCES).document(userUid).set(
            mapOf(
                "createdAt" to FieldValue.serverTimestamp(),
                "createdBy" to userUid,
                "expenses" to 0,
                "registrations" to 0,
                "reservations" to 0,
                "revenues" to 0,
                "total" to 0,
            )
        ).await();
    }

    private suspend fun retrieveUserDataFromFirestore(userUid: String): MutableMap<String, Any>? {
        try {
            val response = firestore.collection(Collections.USERS).document(userUid).get().await();

            return response.data
        } catch (error: Exception) {
            Log.d(AppTag, "error on retrieving user data from firestore: " + error);
            return null;
        }
    }

    fun firestoreUserMaptoFirebaseUserResponse(userDataFromFirestore: MutableMap<String, Any>): FirebaseUserResponse {
        val firebaseUserResponseData = FirebaseUserResponse(
            createdAt = userDataFromFirestore["createdAt"] as Long,
            email = userDataFromFirestore["email"].toString(),
            name = userDataFromFirestore["name"].toString(),
            profilePicture = userDataFromFirestore["profilePicture"] as String?,
            isAdmin = userDataFromFirestore["isAdmin"] as Boolean,
            isPremium = userDataFromFirestore["isPremium"] as Boolean,
            phone = userDataFromFirestore["phone"].toString(),
            uid = userDataFromFirestore["uid"].toString()
        )
        return firebaseUserResponseData;
    }

}
