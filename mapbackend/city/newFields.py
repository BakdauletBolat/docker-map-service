from django.db.models import IntegerField,CharField,FloatField,ManyToManyField,OneToOneField
# from .serilizers import DiametrSerilizer

# from .models import Diametr


class BIntegerField(IntegerField):

    def __init__(self,reqToInput=True, **kwargs):
        self.reqToInput = reqToInput
        super().__init__(**kwargs)

    def getDesk(self):
        return {
                "type": "Binteger",
                "required": self.reqToInput,
                "title": self.verbose_name, 
                "column_name": self.attname
            }

class BCharField(CharField):

    def __init__(self,reqToInput=True, **kwargs):
        self.reqToInput = reqToInput
        super().__init__(**kwargs)
    
    def getDesk(self):
        return {
                "type": "String",
                "required": self.reqToInput,
                "title": self.verbose_name, 
                "column_name": self.attname
            }

class BManyToManyField(ManyToManyField):

    def __init__(self,to,reqToInput=True, **kwargs):
        self.reqToInput = reqToInput
        super().__init__(to,**kwargs)
    
    def getDesk(self):
        return {
                "type": "select",
                "required": self.reqToInput,
                "title": self.verbose_name, 
                "column_name": self.attname
            }

class BOneToOneField(OneToOneField):

    def __init__(self,to,reqToInput=True, **kwargs):
        self.reqToInput = reqToInput
        super().__init__(to,**kwargs)

    
    def getDesk(self):
        return {
                "type": "IDKEY",
                "required": self.reqToInput,
                "title": self.verbose_name, 
                "column_name": self.attname
            }


            

    