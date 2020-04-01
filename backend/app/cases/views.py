from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveUpdateAPIView
from rest_framework.parsers import JSONParser, FormParser
from rest_framework.response import Response

from app.cases.models import Case
from app.cases.parsers import MultiPartJSONParser
from app.cases.serializers import CaseReadSerializer, CaseCreateSerializer, CaseUpdateSerializer


class CaseListView(ListAPIView):
    """
    List all cases
    """
    queryset = Case.objects.all()
    serializer_class = CaseReadSerializer


class CaseCreateView(CreateAPIView):
    """
    Create a new case and it's related prediction instances
    """
    parser_classes = [MultiPartJSONParser, JSONParser, FormParser]
    serializer_class = CaseCreateSerializer


class CaseReadUpdateView(RetrieveUpdateAPIView):
    """
    get:
    Get a specific case by id

    patch:
    Update a specific case by id. It should only be used to update the case with the confirmed image and set the status of confirmed on the related prediction
    """
    queryset = Case

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return CaseReadSerializer
        else:
            return CaseUpdateSerializer

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            instance._prefetched_objects_cache = {}

        detailed_serializer = CaseReadSerializer(instance)
        return Response(detailed_serializer.data)
