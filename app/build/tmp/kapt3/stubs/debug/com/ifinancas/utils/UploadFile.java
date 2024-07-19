package com.ifinancas.utils;

import android.util.Log;
import com.google.firebase.ktx.Firebase;
import com.google.firebase.storage.FirebaseStorage;
import com.ifinancas.data.dataclass.StorageFileResponse;
import java.util.UUID;

@kotlin.Metadata(mv = {1, 9, 0}, k = 1, xi = 48, d1 = {"\u0000 \n\u0002\u0018\u0002\n\u0002\u0010\u0000\n\u0002\b\u0002\n\u0002\u0010\u0002\n\u0000\n\u0002\u0010\u000e\n\u0000\n\u0002\u0018\u0002\n\u0002\b\u0003\u0018\u00002\u00020\u0001B\u0005\u00a2\u0006\u0002\u0010\u0002J\u000e\u0010\u0003\u001a\u00020\u00042\u0006\u0010\u0005\u001a\u00020\u0006J\u001b\u0010\u0007\u001a\u0004\u0018\u00010\b2\u0006\u0010\t\u001a\u00020\u0006H\u0086@\u00f8\u0001\u0000\u00a2\u0006\u0002\u0010\n\u0082\u0002\u0004\n\u0002\b\u0019\u00a8\u0006\u000b"}, d2 = {"Lcom/ifinancas/utils/UploadFile;", "", "()V", "deleteFile", "", "url", "", "uploadFileToFirebaseStorage", "Lcom/ifinancas/data/dataclass/StorageFileResponse;", "file", "(Ljava/lang/String;Lkotlin/coroutines/Continuation;)Ljava/lang/Object;", "app_debug"})
public final class UploadFile {
    
    public UploadFile() {
        super();
    }
    
    @org.jetbrains.annotations.Nullable
    public final java.lang.Object uploadFileToFirebaseStorage(@org.jetbrains.annotations.NotNull
    java.lang.String file, @org.jetbrains.annotations.NotNull
    kotlin.coroutines.Continuation<? super com.ifinancas.data.dataclass.StorageFileResponse> $completion) {
        return null;
    }
    
    public final void deleteFile(@org.jetbrains.annotations.NotNull
    java.lang.String url) {
    }
}