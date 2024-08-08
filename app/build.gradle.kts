plugins {
    alias(libs.plugins.androidApplication)
    alias(libs.plugins.jetbrainsKotlinAndroid)
    id("com.google.gms.google-services")

    id("kotlin-android")
    id("kotlin-kapt")
    id("com.google.dagger.hilt.android")
}

android {
    namespace = "com.ifinancas"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.ifinancas"
        minSdk = 24
        targetSdk = 34
        versionCode = 66
        versionName = "1.5.8"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
        vectorDrawables {
            useSupportLibrary = true
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
            signingConfig = signingConfigs.getByName("debug")
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_1_8
        targetCompatibility = JavaVersion.VERSION_1_8
    }
    kotlinOptions {
        jvmTarget = "1.8"
    }
    buildFeatures {
        compose = true
    }
    composeOptions {
        kotlinCompilerExtensionVersion = "1.5.1"
    }
    packaging {
        resources {
            excludes += "/META-INF/{AL2.0,LGPL2.1}"
        }
    }
}

dependencies {
    implementation(libs.androidx.ui.text.google.fonts)
    implementation(libs.android.ui)
    implementation(libs.jetpack.compose.adapty)
    implementation(libs.androidx.activity.ktx)
    implementation(libs.play.services.ads)

    //skeletum
    implementation(libs.compose.shimmer)
    /*  implementation(libs.firebase.storage.ktx)*/

    // messaging
    implementation(libs.firebase.messaging.ktx)

    // Navigation Compose
    implementation(libs.androidx.material)
    implementation(libs.androidx.navigation.compose.v250rc01)

    implementation(libs.jetpack.compose.packages)
    implementation(libs.play.services.auth)
    implementation(libs.firebase.auth)

    implementation(libs.accompanist.systemuicontroller)
    implementation(libs.accompanist.permissions)
    implementation(libs.runtime.livedata)
    implementation(libs.navigation.compose)
    implementation(libs.coil.compose)
    implementation(libs.composeIcons.font.awesome)

    //datastore
    implementation(libs.androidx.datastore.preferences)

    // hilt
    implementation(libs.hilt.android)
    implementation(libs.androidx.appcompat)
    kapt(libs.hilt.android.compiler)
    kapt(libs.androidx.hilt.compiler)
    implementation(libs.androidx.hilt.navigation.fragment)
    implementation(libs.androidx.hilt.navigation.compose)

    // dagger
    implementation(libs.dagger)
    kapt(libs.dagger.compiler)

    implementation(libs.compose.charts)

    implementation(libs.charty)
    implementation(libs.composeIcons.feather)
    implementation(libs.composeIcons.font.awesome)
    implementation(libs.br.currency)

    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.lifecycle.runtime.ktx)
    implementation(libs.androidx.activity.compose)
    implementation(platform(libs.androidx.compose.bom))
    implementation(libs.androidx.ui)
    implementation(libs.androidx.ui.graphics)
    implementation(libs.androidx.ui.tooling.preview)
    implementation(libs.androidx.material3)
    implementation(libs.firebase.auth.ktx)
    implementation(libs.firebase.firestore)
    implementation(libs.firebase.storage)
    implementation(libs.firebase.messaging)
    testImplementation(libs.junit)
    androidTestImplementation(libs.androidx.junit)
    androidTestImplementation(libs.androidx.espresso.core)
    androidTestImplementation(platform(libs.androidx.compose.bom))
    androidTestImplementation(libs.androidx.ui.test.junit4)
    debugImplementation(libs.androidx.ui.tooling)
    debugImplementation(libs.androidx.ui.test.manifest)
}

//hilt
kapt {
    correctErrorTypes = true
}
