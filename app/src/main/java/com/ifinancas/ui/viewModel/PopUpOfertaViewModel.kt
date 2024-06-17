package com.ifinancas.ui.viewModel

import androidx.lifecycle.ViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow

class PopUpOfertaViewModel : ViewModel() {
    private val _visible = MutableStateFlow(true)
    val visible: StateFlow<Boolean> = _visible

    fun turnOffVisibility(){
        _visible.value = false
    }
}