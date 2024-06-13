package com.ifinancas.data.dataclass

import com.google.firebase.storage.StorageReference

data class StorageFileResponse(val imageUri: String, val fileRef: StorageReference)