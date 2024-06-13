package com.ifinancas.ui.viewModel

import androidx.lifecycle.ViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow

class PopUpHomeViewModel: ViewModel() {
    private val _visible: MutableStateFlow<Boolean> = MutableStateFlow(false)
    val visible:StateFlow<Boolean> = _visible

    fun activeVisibility(){
        _visible.value = true
    }

    fun removeVisibility(){
        _visible.value = false
    }

}