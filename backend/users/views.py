from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User 
from .serializers import UserSerializer
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import JSONParser
from users.models import UserPoints, FCMToken
from .serializers import UserPointsSerializer, FCMTokenSerializer
from rest_framework.response import Response
from rest_framework.views import APIView


class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        user = serializer.save()
        
        if not user:
            return Response({'error':"invalid credentialds"}, status=401)

        token, created = Token.objects.get_or_create(user=user)
        return Response({
            "token":token.key,
            "user": {
                "id": user.id,
                    "email": user.email,
                },
            }, status=201)
    

#login 
class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        email = request.data.get("email")
        password = request.data.get("password")
        print("email", email)
        print("password", password)
        # Importante: authenticate espera username, por eso ponemos email en username
        user = authenticate(username=email, password=password)

        if user is not None:
            print("user", user)
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                "token": token.key,
            }, status=200)
        else:
            return Response({"error": "Invalid credentials"}, status=401)


class FCMTokenRegisterView(generics.CreateAPIView):
    queryset = FCMToken.objects.all()
    serializer_class = FCMTokenSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        token_value = serializer.validated_data['token']
        device_name = serializer.validated_data.get('device_name', '')

        # Allow multiple tokens per user (one per device/browser)
        fcm_token, created = FCMToken.objects.get_or_create(
            user=request.user,
            token=token_value,
            defaults={'device_name': device_name}
        )

        if not created:
            # Optionally update the device name if the token already exists
            if fcm_token.device_name != device_name:
                fcm_token.device_name = device_name
                fcm_token.save()

        return Response({
            "message": "FCM token registered successfully.",
            "token": fcm_token.token,
            "device_name": fcm_token.device_name
        }, status=201 if created else 200)


class GetUserPoints(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_points, created = UserPoints.objects.get_or_create(user=request.user)
        serializer = UserPointsSerializer(user_points)
        return Response(serializer.data)
