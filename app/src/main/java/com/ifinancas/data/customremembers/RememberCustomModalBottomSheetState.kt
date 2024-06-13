package com.ifinancas.data.customremembers

import androidx.compose.material.ExperimentalMaterialApi
//noinspection UsingMaterialAndMaterial3Libraries
import androidx.compose.material.ModalBottomSheetState
import androidx.compose.material.ModalBottomSheetValue
import androidx.compose.material.rememberModalBottomSheetState
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import com.ifinancas.utils.AppUtils

@OptIn(ExperimentalMaterialApi::class)
@Composable
fun rememberCustomModalBottomSheetState(
    tag: String? = null,
    onBackgroundColorChanged: (newColor: Color) -> Unit = {}
): ModalBottomSheetState {

    val sheetState = rememberModalBottomSheetState(
        initialValue = ModalBottomSheetValue.HalfExpanded,
        confirmValueChange = { newValue ->
            // Evita que o estado mude para Hidden
            when (newValue) {
                ModalBottomSheetValue.Hidden -> {
                    false
                }

                ModalBottomSheetValue.Expanded -> {
                    onBackgroundColorChanged(Color.White)
                    true
                }

                else -> {
                    onBackgroundColorChanged(AppUtils.getBackgroundColor(tag.toString()))
                    true
                }
            }
        }
    )
    return sheetState

}