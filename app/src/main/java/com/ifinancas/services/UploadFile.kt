package com.ifinancas.services

import android.util.Log
import androidx.core.net.toUri
import com.google.firebase.ktx.Firebase
import com.google.firebase.storage.FirebaseStorage
import com.google.firebase.storage.ktx.storage
import com.ifinancas.data.dataclass.StorageFileResponse
import com.ifinancas.utils.AppUtils.Companion.AppTag
import kotlinx.coroutines.tasks.await
import java.util.UUID

// Function to upload file to Firebase Storage and get download URL

class UploadFile {
    suspend fun uploadFileToFirebaseStorage(file: String): StorageFileResponse? {
        // Get a reference to Firebase Storage
        val storage = Firebase.storage
        // Create a storage reference
        val storageRef = storage.reference

        // Create a unique filename
        val fileName = UUID.randomUUID().toString()

        // Create a reference to the file in Firebase Storage
        val fileRef = storageRef.child("files/$fileName")

        // Upload file to Firebase Storage
        val uploadTask = fileRef.putFile(file.toUri())

        return try {
            // Upload file to Firebase Storage
            val uploadTask = fileRef.putFile(file.toUri()).await()

            // Get download URL
            val downloadUri = uploadTask.storage.downloadUrl.await().toString()

            // Return download URL
            return StorageFileResponse(downloadUri, fileRef)
        } catch (e: Exception) {
            // Handle exceptions
            e.printStackTrace()
            null
        }
    }

    fun deleteFile(url: String) {
        val storage = FirebaseStorage.getInstance()
        val fileRef = storage.getReferenceFromUrl(url)

        try {
            fileRef.delete();
            Log.d(AppTag, "deletado com sucesso")
        } catch (e: Exception) {
            Log.d(AppTag, "erro ao deletar arquivo: ${e.message}")
        }
    }
}
