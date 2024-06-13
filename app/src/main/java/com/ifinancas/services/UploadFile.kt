package com.ifinancas.services

import androidx.core.net.toUri
import com.google.firebase.ktx.Firebase
import com.google.firebase.storage.StorageReference
import com.google.firebase.storage.ktx.storage
import com.ifinancas.data.dataclass.StorageFileResponse
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

    suspend fun deleteFile(fileRef: StorageReference) {
        val print = Print("deleteFile")
        try {
            fileRef.delete();
            print.log("deletado com sucesso")
        } catch (e: Exception) {
            print.log("erro ao deletar arquivo: ${e.message}")
        }
    }
}
