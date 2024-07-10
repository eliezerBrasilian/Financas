package com.ifinancas.ui.components

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.Icon
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.material3.TextFieldDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.ifinancas.R
import compose.icons.FeatherIcons
import compose.icons.feathericons.Eye
import compose.icons.feathericons.EyeOff

@Preview
@Composable
fun InputText(
    value: String = "teste",
    placeHolderText: String = "teste",
    keyboardType: KeyboardType = KeyboardType.Text,
    singleLine: Boolean = true,
    onAction: KeyboardActions = KeyboardActions.Default,
    setEmailInput: (value: String) -> Unit = {},
    isPassword: Boolean = false,
    onChangeText: (t: String) -> Unit = {}
) {

    var passwordVisible by remember {
        mutableStateOf(false)
    }

    OutlinedTextField(
        value = value, onValueChange = onChangeText,
        singleLine = singleLine,
        keyboardActions = onAction,
        modifier = Modifier
            .fillMaxWidth()
            .background(Color.White),
        colors = TextFieldDefaults.colors(
            unfocusedContainerColor = Color.White,
            focusedContainerColor = Color.White,
            focusedTextColor = Color.DarkGray,
            unfocusedTextColor = Color.DarkGray,
            focusedIndicatorColor = Color.Blue,
            unfocusedIndicatorColor = Color.Blue
        ),
        placeholder = {
            Text(
                text = placeHolderText,
                color = Color.Gray,
                fontSize = 15.sp,
            )
        },
        keyboardOptions = KeyboardOptions(keyboardType = keyboardType),
        trailingIcon = {
            if (isPassword) Icon(
                imageVector = if (!passwordVisible) FeatherIcons.Eye else FeatherIcons.EyeOff,
                contentDescription = null,
                modifier = Modifier
                    .size(15.dp)
                    .clickable { passwordVisible = !passwordVisible }
            )
            else null
        },
        visualTransformation = if (!passwordVisible && isPassword) PasswordVisualTransformation() else VisualTransformation.None
    )

}

