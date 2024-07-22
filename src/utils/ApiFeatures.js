
    export class ApiFeatures{
        constructor(mongooseQuery,searchquery){
            this.mongooseQuery = mongooseQuery
            this.searchquery = searchquery
        }

        pagination(){
            let pagenumber=this.searchquery.page*1||1
            if(this.searchquery.page<0){
                pagenumber=1
            }
            const limit = 5;
            let skip=(pagenumber-1)*limit
            this.pagenumber=pagenumber
            this.mongooseQuery.skip(skip).limit(limit)
            return this
        }
        filter(){
            let filterObj=structuredClone(this.searchquery)
            filterObj=JSON.stringify(filterObj)
            filterObj=filterObj.replace(/(gte|gt|lte|lt)/g,match=>`$${match}`)
            filterObj=JSON.parse(filterObj)
            let excludedFields=["page","sort","search","fields"]
            excludedFields.forEach(el=>delete filterObj[el])
            this.mongooseQuery.find(filterObj)
            return this
        }
        sort(){
            if(this.searchquery.sort){
                const sortBy=this.searchquery.sort.split(",").join(" ")
                this.mongooseQuery.sort(sortBy)
            }
            return this
        }
        fields(){
            if(this.searchquery.fields){
                const fields=this.searchquery.fields.split(",").join(" ")
                this.mongooseQuery.select(fields)
            }
            return this
        }
        search(){
                if(this.searchquery.search){
                   this.mongooseQuery.find({
                        $or: [
                            { title: { $regex: this.searchquery.search, $options: "i" } },
                            { description: { $regex: this.searchquery.search, $options: "i" } },
                        ],
                    });
                        }           return this
    
    }}