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
        versionCode = 55
        versionName = "1.4.7"

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

    //googgleads
    implementation("com.google.android.gms:play-services-ads:23.1.0")

    //icons

    //skeletum
    implementation("com.valentinilk.shimmer:compose-shimmer:1.3.0")
    /*  implementation(libs.firebase.storage.ktx)*/
    /*

        // messaging
        implementation("com.google.firebase:firebase-messaging-ktx:23.4.1")*/

    // Navigation Compose
    implementation("androidx.compose.material:material:1.4.2")
    implementation("androidx.navigation:navigation-compose:2.5.0-rc01")

    //livedata
    implementation("androidx.compose.runtime:runtime-livedata:1.7.0-alpha05")

    //google signin
    implementation("com.google.android.gms:play-services-auth:21.2.0")
    implementation("com.google.firebase:firebase-auth:23.0.0")

    implementation("com.google.accompanist:accompanist-systemuicontroller:0.27.0")
    implementation("com.google.accompanist:accompanist-permissions:0.31.1-alpha")
    implementation("androidx.compose.runtime:runtime-livedata:1.7.0-alpha05")
    implementation("androidx.navigation:navigation-compose:2.7.6")
    implementation("io.coil-kt:coil-compose:2.5.0")
    implementation("br.com.devsrsouza.compose.icons:font-awesome:1.1.0")

    //datastore
    implementation("androidx.datastore:datastore-preferences:1.0.0")

    // hilt
    implementation("com.google.dagger:hilt-android:2.50")
    kapt("com.google.dagger:hilt-android-compiler:2.50")
    kapt("androidx.hilt:hilt-compiler:1.0.0")
    implementation("androidx.hilt:hilt-navigation-fragment:1.0.0")
    implementation("androidx.hilt:hilt-navigation-compose:1.0.0-alpha03")

    // dagger
    implementation("com.google.dagger:dagger:2.38.1")
    kapt("com.google.dagger:dagger-compiler:2.38.1")

    implementation("io.github.bytebeats:compose-charts:0.2.1")

    implementation(libs.charty)
    implementation(libs.composeIcons.feather)
    implementation(libs.composeIcons.font.awesome)
    implementation(libs.br.currency)
    //
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
