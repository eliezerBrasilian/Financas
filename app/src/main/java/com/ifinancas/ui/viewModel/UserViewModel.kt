package com.ifinancas.ui.viewModel

import androidx.lifecycle.LiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.liveData
import androidx.lifecycle.viewModelScope
import com.ifinancas.services.UserService
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class UserViewModel @Inject constructor(
    private val userService: UserService
) : ViewModel() {
    val email: LiveData<String?> = liveData {
        userService.getEmail().collect { emailValue ->
            emit(emailValue)
        }
    }

    val name: LiveData<String?> = liveData {
        userService.getName().collect { nameValue ->
            emit(nameValue)
        }
    }

    val uid: LiveData<String?> = liveData {
        userService.getUid().collect { uidValue ->
            emit(uidValue)
        }
    }


    val photo: LiveData<String?> = liveData {
        userService.getPhoto().collect { photoValue ->
            emit(photoValue)
        }
    }

    fun saveEmail(email: String) {
        viewModelScope.launch {
            userService.saveEmail(email)
        }
    }

    fun saveName(name: String) {
        viewModelScope.launch {
            userService.saveName(name)
        }
    }

    fun saveUid(uid: String) {
        viewModelScope.launch {
            userService.saveUid(uid)
        }
    }

    fun savePhoto(photo: String) {
        viewModelScope.launch {
            userService.savePhoto(photo)
        }
    }

    fun clearAllData() {
        viewModelScope.launch {
            userService.clearAllData()
        }
    }

    fun updateProfilePicture(
        oldProfilePictureReferenceUrl: String?,
        newProfilePicture: String,
        userUid: String
    ) = viewModelScope.launch {
        userService.updateProfilePicture(oldProfilePictureReferenceUrl, newProfilePicture, userUid)
    }
}
