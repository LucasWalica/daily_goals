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
from users.models import UserPoints
from .serializers import UserPointsSerializer
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



class GetUserPoints(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_points, created = UserPoints.objects.get_or_create(user=request.user)
        serializer = UserPointsSerializer(user_points)
        return Response(serializer.data)
