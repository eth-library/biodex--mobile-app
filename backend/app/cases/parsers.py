import json
from django.http import QueryDict
from rest_framework.parsers import BaseParser, DataAndFiles
from django.conf import settings
from django.http.multipartparser import MultiPartParser as DjangoMultiPartParser, MultiPartParserError
from rest_framework.exceptions import ParseError


class MultiPartJSONParser(BaseParser):
    """
    Parser for multipart form data, which may include file data and JSON objects.
    """
    media_type = 'multipart/form-data'

    def parse(self, stream, media_type=None, parser_context=None):
        """
        Parses the incoming bytestream as a multipart encoded form,
        and returns a DataAndFiles object.

        `.data` will be a `QueryDict` containing all the form parameters.
        `.files` will be a `QueryDict` containing all the form files.
        """
        parser_context = parser_context or {}
        request = parser_context['request']
        encoding = parser_context.get('encoding', settings.DEFAULT_CHARSET)
        meta = request.META.copy()
        meta['CONTENT_TYPE'] = media_type
        upload_handlers = request.upload_handlers

        try:
            parser = DjangoMultiPartParser(meta, stream, upload_handlers, encoding)
            data, files = parser.parse()
            qdict = QueryDict(mutable=True)
            qdict.update(data)
            for key in data:
                if data[key]:
                    try:
                        qdict[key] = json.loads(data[key])
                    except ValueError:
                        pass
            return DataAndFiles(qdict, files)
        except MultiPartParserError as exc:
            raise ParseError('Multipart form parse error - %s' % str(exc))
