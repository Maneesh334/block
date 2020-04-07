<!doctype html>
<html lang="en">
	<head>
		<meta http-equiv="Content-type" content="text/html; charset=utf-8">
		<meta name="viewport" content="width=device-width,initial-scale=1">

		<title>ellipsis</title>
		
		<link rel="shortcut icon" type="image/png" href="/media/images/favicon.png">
		<link rel="alternate" type="application/rss+xml" title="RSS 2.0" href="http://www.datatables.net/rss.xml">
		
		<link rel="stylesheet" href="/media/css/site.css?_=c863b7da7e72b0e94c16b81c38293467">
		<!--[if lte IE 9]>
		<link rel="stylesheet" type="text/css" href="/media/css/ie.css" />
		<![endif]-->
		
		<style>
			
		</style>

		<script src="/media/js/site.js?_=a64810efc82bfd3b645784011efa5963"></script>
		<script src="/media/js/dynamic.php?comments-page=plug-ins%2FdataRender%2Fellipsis" async></script>
		
		<script>
			
		</script>
	</head>
	<body class="comments">
		<a name="top"></a>

		<div class="fw-background">
			<div>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
			</div>
		</div>

		<div class="fw-container">
			<div class="fw-header">
				<div class="nav-master">
					<div class="nav-item active">
						<a href="/">DataTables</a>
					</div>
					<div class="nav-item">
						<a href="//editor.datatables.net">Editor</a>
					</div>
				</div>

				<div class="nav-search">
					<div class="nav-item i-manual">
						<a href="/manual">Manual</a>
					</div>
					<div class="nav-item i-download">
						<a href="/download">Download</a>
					</div>
					<div class="nav-item i-user">
						<div class="account"></div>
					</div>
					<div class="nav-item search">
						<form action="/q/" method="GET">
							<input type="text" name="q" placeholder="Search . . ." autocomplete="off">
						</form>
					</div>
				</div>
			</div>

			<div class="fw-hero">
				
			</div>

			<div class="fw-nav">
				<div class="nav-main">
					<ul><li class=" sub"><a href="/examples/index">Examples</a></li><li class=" sub"><a href="/manual/index">Manual</a></li><li class=" sub"><a href="/reference/index">Reference</a></li><li class=" sub"><a href="/extensions/index">Extensions</a></li><li class=" sub"><a href="/plug-ins/index">Plug-ins</a><ul><li class=""><a href="/plug-ins/type-detection">Type detection</a></li><li class=""><a href="/plug-ins/dataRender">Render</a></li><li class=""><a href="/plug-ins/api">API</a></li><li class=""><a href="/plug-ins/pagination">Pagination</a></li><li class=""><a href="/plug-ins/filtering">Filtering</a></li><li class=""><a href="/plug-ins/i18n">Internationalisation</a></li><li class=""><a href="/plug-ins/sorting">Sorting</a></li></ul></li><li class=""><a href="/blog/index">Blog</a></li><li class=""><a href="/forums/index">Forums</a></li><li class=""><a href="/support/index">Support</a></li><li class=""><a href="/faqs/index">FAQs</a></li><li class=""><a href="/download/index">Download</a></li><li class=""><a href="/purchase/index">Purchase</a></li></ul>
				</div>

				<div class="mobile-show">
					<a><i>Show site navigation</i></a>
				</div>
			</div>

			<div class="fw-body">
				<div class="content">
					
					
					<h1 class="page_title" title="ellipsis">ellipsis</h1>

					
					<p>Restrict output data to a particular length, showing anything
    longer with ellipsis and a browser provided tooltip on hover.</p>

<ul class="markdown">
<li>Author: <a href="http://datatables.net">Allan Jardine</a></li>
<li>Requires: DataTables 1.10+</li>
</ul>

<p>This data rendering helper method can be useful for cases where you have
potentially large data strings to be shown in a column that is restricted by
width. The data for the column is still fully searchable and sortable, but if
it is longer than a give number of characters, it will be truncated and
shown with ellipsis. A browser provided tooltip will show the full string
to the end user on mouse hover of the cell.</p>

<p>This function should be used with the <a href="//datatables.net/reference/option/columns.render"><code class="option" title="DataTables initialisation option">columns.render</code></a> configuration
option of DataTables.</p>

<p>It accepts three parameters:</p>

<ol class="markdown">
<li><a href="//datatables.net/reference/type/integer"><code class="type" title="Javascript parameter type">integer</code></a> - The number of characters to restrict the displayed data
to.</li>
<li><a href="//datatables.net/reference/type/boolean"><code class="type" title="Javascript parameter type">boolean</code></a> (optional - default <code>false</code>) - Indicate if the truncation
of the string should not occur in the middle of a word (<code>true</code>) or if it
can (<code>false</code>). This can allow the display of strings to look nicer, at the
expense of showing less characters.</li>
<li><a href="//datatables.net/reference/type/boolean"><code class="type" title="Javascript parameter type">boolean</code></a> (optional - default <code>false</code>) - Escape HTML entities
(<code>true</code>) or not (<code>false</code> - default).</li>
</ol>

<h2 data-anchor="Plug-in-code"><a name="Plug-in-code"></a>Plug-in code</h2>

<pre><code class="multiline language-js">jQuery.fn.dataTable.render.ellipsis = function ( cutoff, wordbreak, escapeHtml ) {
    var esc = function ( t ) {
        return t
            .replace( /&amp;/g, '&amp;amp;' )
            .replace( /&lt;/g, '&amp;lt;' )
            .replace( /&gt;/g, '&amp;gt;' )
            .replace( /"/g, '&amp;quot;' );
    };

    return function ( d, type, row ) {
        // Order, search and type get the original data
        if ( type !== 'display' ) {
            return d;
        }

        if ( typeof d !== 'number' &amp;&amp; typeof d !== 'string' ) {
            return d;
        }

        d = d.toString(); // cast numbers

        if ( d.length &lt;= cutoff ) {
            return d;
        }

        var shortened = d.substr(0, cutoff-1);

        // Find the last white space character in the string
        if ( wordbreak ) {
            shortened = shortened.replace(/\s([^\s]*)$/, '');
        }

        // Protect against uncontrolled HTML input
        if ( escapeHtml ) {
            shortened = esc( shortened );
        }

        return '&lt;span class="ellipsis" title="'+esc(d)+'"&gt;'+shortened+'&amp;#8230;&lt;/span&gt;';
    };
};
</code></pre>

<h2 data-anchor="CDN"><a name="CDN"></a>CDN</h2>

<p>This plug-in is available on the DataTables CDN:</p>

<div class="cdn">
    <span>JS</span>
    <input type="text" value="//cdn.datatables.net/plug-ins/1.10.20/dataRender/ellipsis.js" readonly>
</div>

<p>Note that if you are using multiple plug-ins, it is beneficial in terms of performance to combine the plug-ins into a single file and host it on your own server, rather than making multiple requests to the DataTables CDN.</p>

<h2 data-anchor="Version-control"><a name="Version-control"></a>Version control</h2>

<p>If you have any ideas for how this plug-in can be improved, or spot anything that is in error, it is available on GitHub and pull requests are very welcome!</p>

<ul class="markdown">
<li>This plug-in: <a href="https://github.com/DataTables/Plugins/tree/master/dataRender/ellipsis.js">ellipsis.js</a></li>
<li>Full DataTables plug-ins repository: <a href="https://github.com/DataTables/Plugins/">DataTables/Plugins</a></li>
</ul>

<h2 data-anchor="Examples"><a name="Examples"></a>Examples</h2>

<pre><code class="multiline language-js">// Restrict a column to 17 characters, don't split words
  $('#example').DataTable( {
    columnDefs: [ {
      targets: 1,
      render: $.fn.dataTable.render.ellipsis( 17, true )
    } ]
  } );
</code></pre>

<pre><code class="multiline language-js">// Restrict a column to 10 characters, do split words
  $('#example').DataTable( {
    columnDefs: [ {
      targets: 2,
      render: $.fn.dataTable.render.ellipsis( 10 )
    } ]
  } );
</code></pre>

				</div>
			</div>

			<div class="fw-page-nav">
				<div class="page-nav">
					<div class="page-nav-title">Page navigation</div>
				</div>
			</div>
		</div>

		<div class="fw-footer">
			<div class="skew"></div>
			<div class="skew-bg"></div>
			<div class="copyright">
				<h4>DataTables</h4>
				<p>
					DataTables designed and created by <a href="//sprymedia.co.uk">SpryMedia Ltd</a>.<br>
					&copy; 2007-2020 <a href="/license/mit">MIT licensed</a>. <a href="/privacy">Privacy policy</a>. <a href="/supporters">Supporters</a>.<br>
					SpryMedia Ltd is registered in Scotland, company no. SC456502.
				</p>
			</div>
		</div>

		<script>
		  var _gaq = _gaq || [];
		  _gaq.push(['_setAccount', 'UA-365466-5']);
		  _gaq.push(['_trackPageview']);

		  (function() {
		    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
		    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
		  })();
		</script>
	</body>
</html>
