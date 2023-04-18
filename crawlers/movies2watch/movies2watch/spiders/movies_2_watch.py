import scrapy

def build_start_urls():
    urls = []
    count_urls = 1041
    for i in range(1, count_urls):
        urls.append(
            'https://movies2watch.ru/movies?page='
            + str(i)
        )
    return urls

class Movies2WatchSpider(scrapy.Spider):
    name = 'movies_2_watch'
    allowed_domains = ['movies2watch.ru']

    start_urls = build_start_urls()

    def parse(self, response):
        movies = response.xpath("//div[@class='filmlist ']//a/@href")

        for movie in movies:
            
            link = "https://movies2watch.ru" + str(movie.extract())

            yield response.follow(link, self.parse_item)
            
    def parse_item(self, response):
        try:
            movie_poster = response.xpath("//section[@class='info']//div[@class='poster']//span//img/@src").get()
            
            movie_name = response.xpath("//div[@class='info']//h1[@itemprop='name']/text()").get()
            
            movie_runtime = response.xpath("//div[@class='info']//div[@class='meta lg']//span//text()")[2].get()
            
            movie_description = response.xpath("//div[@class='info']//div[@itemprop='description']//text()").get()
            
            movie_country = response.xpath("//div[@class='info']//div[@class='meta']//div")[0].xpath(".//span//a//text()").get()
            
            movie_genre = response.xpath("//div[@class='info']//div[@class='meta']//div")[1].xpath(".//span//a//text()").extract()
            
            movie_release_date = response.xpath("//div[@class='info']//div[@class='meta']//div")[2].xpath(".//span[@itemprop='dateCreated']//text()").get()
            
            movie_director = response.xpath("//div[@class='info']//div[@class='meta']//div")[3].xpath(".//span[@class='shorting']//text()").get()
            
            movie_casts = response.xpath("//div[@class='info']//div[@class='casts']//a//span//text()").extract()
            
            movie_url = response.url

            yield {
                'movie_name': movie_name,
                'movie_runtime': movie_runtime,
                'movie_description': movie_description,
                'movie_country': movie_country,
                'movie_genre': movie_genre,
                'movie_release_date': movie_release_date,
                'movie_director': movie_director,
                'movie_casts': movie_casts,
                'movie_poster': movie_poster,
                'movie_url': movie_url,
            }
        
        except Exception as inst:
            yield {'url': response.url}
            log.error(inst, exc_info=True)

    
    def _get_time_stamp(self, datetime_str) -> int:
        try:
            datetime_str = self._format_text(datetime_str)
            if datetime_str.find('Yesterday')!=-1:
                today = date.today()
                yesterday = today - timedelta(days = 1)
                yesterday = yesterday.strftime('%m-%d-%Y')
                datetime_str = datetime_str.replace('Yesterday', yesterday)
            elif datetime_str.find('Today')!=-1:
                today = date.today()
                today = today.strftime('%m-%d-%Y')
                datetime_str = datetime_str.replace('Today', today)

            date_format = '%m-%d-%Y, %I:%M %p'
            timestamp = datetime.strptime(datetime_str,date_format).timestamp()
            return int(timestamp)
        except Exception as inst:
            log.error(inst, exc_info=True)
        return 0

    def _format_text(self, text):
        escapes = ''.join([chr(char) for char in range(1, 32)])
        translator = str.maketrans('', '', escapes)
        return text.translate(translator)