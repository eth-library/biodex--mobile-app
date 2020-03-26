from rest_framework import status
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveUpdateAPIView
from rest_framework.response import Response

from app.cases.models import Case
from app.cases.serializers import CaseSerializer
from app.predictions.serializers import PredictionSerializer


class CaseListView(ListAPIView):
    """
    List all cases
    """
    queryset = Case.objects.all()
    serializer_class = CaseSerializer


class CaseCreateView(CreateAPIView):
    serializer_class = CaseSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        case = serializer.save(user=request.user)

        for prediction in request.predictions:
            serializer = PredictionSerializer(data=prediction)
            serializer.is_valid(raise_exception=True)
            serializer.save(case=case)

        headers = self.get_success_headers(serializer.data)
        return Response(self.get_serializer(case).data, status=status.HTTP_201_CREATED, headers=headers)


class CaseReadUpdateView(RetrieveUpdateAPIView):
    queryset = Case
    serializer_class = CaseSerializer
